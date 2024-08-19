import { Injectable } from '@nestjs/common';
import { CreateDTO, ReactDTO } from 'src/DTO/post';
import { Payload } from 'src/jwt-strategy';
import { PrismaService } from 'src/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class PostService {
    constructor(
        private readonly db: PrismaService,
        private readonly socket: SocketGateway
    ) { }

    async create(user: Payload, data: CreateDTO) {
        try {
            const created = await this.db.post.create({
                data: {
                    ...data, userId: user.id
                },
                include: {
                    reaction: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            updatedAt: 'desc'
                        }
                    },
                    user: true
                }
            })
            this.socket.server.emit('post', created)
            return created
        } catch (error) {
            throw error
        }
    }

    async getAll() {
        try {
            // return await this.db.post.findMany({
            //     select: {
            //         id: true
            //     },
            //     orderBy: {
            //         createdAt: 'desc'
            //     }
            // })
            return await this.db.post.findMany({
                include: {
                    reaction: {
                        include: {
                            user: true
                        }
                    },
                    user: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getOne(id: string) {
        try {
            return await this.db.post.findUnique({
                where: {
                    id
                },
                include: {
                    reaction: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            updatedAt: 'desc'
                        }
                    },
                    user: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    async react(user: Payload, { postId, type }: ReactDTO) {
        try {
            const reacts = await this.db.reaction.findMany({
                where: {
                    postId, userId: user.id
                }
            })

            if (reacts.length === 0) {
                await this.db.reaction.create({
                    data: {
                        postId, userId: user.id, type
                    }
                })
            } else {
                if (reacts[0].type === type) {
                    await this.db.reaction.deleteMany({
                        where: {
                            postId, userId: user.id
                        }
                    })
                } else {
                    await this.db.reaction.updateMany({
                        where: {
                            postId, userId: user.id
                        },
                        data: {
                            type
                        }
                    })
                }
            }

            const reacted = await this.db.post.findUnique({
                where: {
                    id: postId
                },
                include: {
                    reaction: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            updatedAt: 'desc'
                        }
                    },
                    user: true
                }
            })
            this.socket.server.emit('react', reacted)
            return reacted
        } catch (error) {
            throw error
        }
    }
}