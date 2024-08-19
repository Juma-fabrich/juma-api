import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { AuthDTO } from 'src/DTO/user';
import { Payload } from 'src/jwt-strategy';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private readonly db: PrismaService,
        private readonly jwt: JwtService
    ) { }

    async signUp(data: AuthDTO) {
        try {
            const hashed = hashSync(data.password, 10)
            return await this.db.user.create({ data: { ...data, password: hashed } })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async login(data: AuthDTO) {
        try {
            const found = await this.db.user.findUnique({
                where: {
                    name: data.name
                }
            })
            if (!found) throw new NotFoundException()

            if (compareSync(data.password, found.password)) {
                return {
                    token: this.jwt.sign({id: found.id}, {
                        secret: process.env.JWT_SECRET
                    })
                }
            }
            throw new BadRequestException()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async search(query: string){
        try {
            return await this.db.user.findMany({
                where: {
                    name: {
                        contains: query
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }

    async auth(user: Payload){
        try {
            return await this.db.user.findUnique({
                where: {id: user.id},
                include: {
                    family: {
                        orderBy: {
                            createdAt: 'asc'
                        },
                        include: {
                            message: {
                                include: {
                                    user: true,
                                    family: true
                                },
                                orderBy: {
                                    createdAt: 'desc'
                                },
                                take: 1
                            }
                        }
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }
}
