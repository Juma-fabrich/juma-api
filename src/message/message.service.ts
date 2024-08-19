import { Injectable } from '@nestjs/common';
import { SendDTO } from 'src/DTO/message';
import { Payload } from 'src/jwt-strategy';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class MessageService {
    constructor(
        private readonly db: PrismaService,
        private readonly socket: SocketGateway
    ){}

    async send(user: Payload, familyId: string, {photo, text}: SendDTO){
        try {
            const message = await this.db.message.create({
                data: {
                    text, photo, userId: user.id, familyId
                },
                include: {
                    user: true,
                    family: true
                }
            })
            this.socket.server.emit('message', message)
        } catch (error) {
            throw error
        }
    }

    async get(user: Payload, familyId: string){
        try {
            return await this.db.message.findMany({
                where: {
                    familyId
                },
                include: {
                    user: true,
                    family: {
                        select: {
                            id: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'asc'
                }
            })
        } catch (error) {
            throw error
        }
    }
}