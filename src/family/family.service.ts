import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateDTO, RequestDTO } from 'src/DTO/family';
import { Payload } from 'src/jwt-strategy';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FamilyService {
    constructor(
        private readonly db: PrismaService
    ) { }

    async create(user: Payload, data: CreateDTO) {
        try {
            if (
                await this.db.family.findUnique({
                    where: {
                        name: data.name
                    }
                })
            ) throw new BadRequestException()

            return await this.db.family.create({
                data: {
                    ...data, head: {
                        create: {
                            userId: user.id
                        }
                    },
                    members: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }

    async updateHead(user: Payload, newHeadId: string, familyId: string) {
        try {
            if (
                !await this.db.head.findUnique({
                    where: {
                        userId: user.id,
                        familyId
                    }
                })
            ) throw new BadRequestException()

            return await this.db.head.update({
                where: {
                    familyId, userId: user.id
                },
                data: {
                    userId: newHeadId
                }
            })
        } catch (error) {
            throw error
        }
    }

    async request(user: Payload, familyId: string, { about }: RequestDTO) {
        try {
            const founds = await this.db.familyRequest.findMany({
                where: {
                    familyId, userId: user.id, type: 'ask'
                }
            })

            if (founds.length !== 0) {
                return await this.db.familyRequest.update({
                    where: {
                        id: founds.at(0).id
                    },
                    data: {
                        about, familyId, userId: user.id, type: 'ask'
                    }
                })
            }

            return await this.db.familyRequest.create({
                data: {
                    about, familyId, userId: user.id, type: 'ask'
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getRequest(user: Payload, familyId: string) {
        try {
            await this.isMembers(user, familyId)

            return await this.db.familyRequest.findMany({
                where: {
                    familyId, type: 'ask'
                },
                include: {
                    user: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getInvitation(user: Payload) {
        try {

            return await this.db.familyRequest.findMany({
                where: {
                    userId: user.id, type: 'invite'
                },
                include: {
                    family: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    async invite(user: Payload, userId: string, familyId: string, { about }: RequestDTO) {
        try {
            await this.isMembers(user, familyId)

            const founds = await this.db.familyRequest.findMany({
                where: {
                    familyId, userId, type: 'invite'
                }
            })

            if (founds.length !== 0) {
                return await this.db.familyRequest.update({
                    where: {
                        id: founds.at(0).id
                    },
                    data: {
                        about, familyId, userId, type: 'invite'
                    }
                })
            }

            return await this.db.familyRequest.create({
                data: {
                    about, familyId, userId, type: 'invite'
                }
            })
        } catch (error) {
            throw error
        }
    }

    async accept(user: Payload, familyId: string, id: string) {
        try {

            const request = await this.db.familyRequest.delete({
                where: { id }
            })
            if (!request) throw new NotFoundException()

            return await this.db.family.update({
                where: {
                    id: familyId
                },
                data: {
                    members: {
                        connect: {
                            id: request.userId
                        }
                    }
                }
            })

        } catch (error) {
            throw error
        }
    }

    async decline(user: Payload, familyId: string, id: string) {
        try {
            await this.isMembers(user, familyId)

            const request = await this.db.familyRequest.delete({
                where: { id, familyId }
            })
            if (!request) throw new NotFoundException()

        } catch (error) {
            throw error
        }
    }

    async get(user: Payload, familyId: string) {
        try {
            // await this.isMembers(user, familyId)

            return await this.db.family.findUnique({
                where: {
                    id: familyId
                },
                include: {
                    members: true,
                    familyRequest: {
                        include: {
                            user: true
                        }
                    }
                },
            })
        } catch (error) {
            throw error
        }
    }

    async getAll(){
        try {
            return await this.db.family.findMany({
                include: {
                    members: true,
                    familyRequest: {
                        include: {
                            user: true
                        }
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }

    private async isMembers(user: Payload, familyId: string) {
        try {
            if (
                !await this.db.family.findUnique({
                    where: {
                        id: familyId, members: {
                            some: {
                                id: user.id
                            }
                        }
                    }
                }) &&
                !await this.db.head.findUnique({
                    where: {
                        familyId, userId: user.id
                    }
                })
            ) throw new UnauthorizedException()
            return true;
        } catch (error) {
            throw error
        }
    }
}