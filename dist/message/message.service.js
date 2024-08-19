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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const socket_gateway_1 = require("../socket/socket.gateway");
let MessageService = class MessageService {
    constructor(db, socket) {
        this.db = db;
        this.socket = socket;
    }
    async send(user, familyId, { photo, text }) {
        try {
            const message = await this.db.message.create({
                data: {
                    text, photo, userId: user.id, familyId
                },
                include: {
                    user: true,
                    family: true
                }
            });
            this.socket.server.emit('message', message);
        }
        catch (error) {
            throw error;
        }
    }
    async get(user, familyId) {
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
            });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway])
], MessageService);
//# sourceMappingURL=message.service.js.map