"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const socket_gateway_1 = require("../socket/socket.gateway");
let PostService = class PostService {
    constructor(db, socket) {
        this.db = db;
        this.socket = socket;
    }
    async create(user, data) {
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
            });
            this.socket.server.emit('post', created);
            return created;
        }
        catch (error) {
            throw error;
        }
    }
    async getAll() {
        try {
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
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getOne(id) {
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
            });
        }
        catch (error) {
            throw error;
        }
    }
    async react(user, { postId, type }) {
        try {
            const reacts = await this.db.reaction.findMany({
                where: {
                    postId, userId: user.id
                }
            });
            if (reacts.length === 0) {
                await this.db.reaction.create({
                    data: {
                        postId, userId: user.id, type
                    }
                });
            }
            else {
                if (reacts[0].type === type) {
                    await this.db.reaction.deleteMany({
                        where: {
                            postId, userId: user.id
                        }
                    });
                }
                else {
                    await this.db.reaction.updateMany({
                        where: {
                            postId, userId: user.id
                        },
                        data: {
                            type
                        }
                    });
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
            });
            this.socket.server.emit('react', reacted);
            return reacted;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway])
], PostService);
//# sourceMappingURL=post.service.js.map