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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    constructor(db, jwt) {
        this.db = db;
        this.jwt = jwt;
    }
    async signUp(data) {
        try {
            const hashed = (0, bcrypt_1.hashSync)(data.password, 10);
            return await this.db.user.create({ data: { ...data, password: hashed } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async login(data) {
        try {
            const found = await this.db.user.findUnique({
                where: {
                    name: data.name
                }
            });
            if (!found)
                throw new common_1.NotFoundException();
            if ((0, bcrypt_1.compareSync)(data.password, found.password)) {
                return {
                    token: this.jwt.sign({ id: found.id }, {
                        secret: process.env.JWT_SECRET
                    })
                };
            }
            throw new common_1.BadRequestException();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async search(query) {
        try {
            return await this.db.user.findMany({
                where: {
                    name: {
                        contains: query
                    }
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async auth(user) {
        try {
            return await this.db.user.findUnique({
                where: { id: user.id },
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
            });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map