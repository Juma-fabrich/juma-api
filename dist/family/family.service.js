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
exports.FamilyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let FamilyService = class FamilyService {
    constructor(db) {
        this.db = db;
    }
    async create(user, data) {
        try {
            if (await this.db.family.findUnique({
                where: {
                    name: data.name
                }
            }))
                throw new common_1.BadRequestException();
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
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateHead(user, newHeadId, familyId) {
        try {
            if (!await this.db.head.findUnique({
                where: {
                    userId: user.id,
                    familyId
                }
            }))
                throw new common_1.BadRequestException();
            return await this.db.head.update({
                where: {
                    familyId, userId: user.id
                },
                data: {
                    userId: newHeadId
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async request(user, familyId, { about }) {
        try {
            const founds = await this.db.familyRequest.findMany({
                where: {
                    familyId, userId: user.id, type: 'ask'
                }
            });
            if (founds.length !== 0) {
                return await this.db.familyRequest.update({
                    where: {
                        id: founds.at(0).id
                    },
                    data: {
                        about, familyId, userId: user.id, type: 'ask'
                    }
                });
            }
            return await this.db.familyRequest.create({
                data: {
                    about, familyId, userId: user.id, type: 'ask'
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getRequest(user, familyId) {
        try {
            await this.isMembers(user, familyId);
            return await this.db.familyRequest.findMany({
                where: {
                    familyId, type: 'ask'
                },
                include: {
                    user: true
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getInvitation(user) {
        try {
            return await this.db.familyRequest.findMany({
                where: {
                    userId: user.id, type: 'invite'
                },
                include: {
                    family: true
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async invite(user, userId, familyId, { about }) {
        try {
            await this.isMembers(user, familyId);
            const founds = await this.db.familyRequest.findMany({
                where: {
                    familyId, userId, type: 'invite'
                }
            });
            if (founds.length !== 0) {
                return await this.db.familyRequest.update({
                    where: {
                        id: founds.at(0).id
                    },
                    data: {
                        about, familyId, userId, type: 'invite'
                    }
                });
            }
            return await this.db.familyRequest.create({
                data: {
                    about, familyId, userId, type: 'invite'
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async accept(user, familyId, id) {
        try {
            const request = await this.db.familyRequest.delete({
                where: { id }
            });
            if (!request)
                throw new common_1.NotFoundException();
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
            });
        }
        catch (error) {
            throw error;
        }
    }
    async decline(user, familyId, id) {
        try {
            await this.isMembers(user, familyId);
            const request = await this.db.familyRequest.delete({
                where: { id, familyId }
            });
            if (!request)
                throw new common_1.NotFoundException();
        }
        catch (error) {
            throw error;
        }
    }
    async get(user, familyId) {
        try {
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
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getAll() {
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
            });
        }
        catch (error) {
            throw error;
        }
    }
    async isMembers(user, familyId) {
        try {
            if (!await this.db.family.findUnique({
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
                }))
                throw new common_1.UnauthorizedException();
            return true;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.FamilyService = FamilyService;
exports.FamilyService = FamilyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FamilyService);
//# sourceMappingURL=family.service.js.map