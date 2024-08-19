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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyController = void 0;
const common_1 = require("@nestjs/common");
const family_service_1 = require("./family.service");
const jwt_auth_guard_1 = require("../jwt-auth.guard");
const family_1 = require("../DTO/family");
let FamilyController = class FamilyController {
    constructor(service) {
        this.service = service;
    }
    async get({ user }, familyId) {
        return await this.service.get(user, familyId);
    }
    async getAll() {
        return await this.service.getAll();
    }
    async create({ user }, data) {
        return await this.service.create(user, data);
    }
    async updateHead({ user }, familyId, newHeadId) {
        return await this.service.updateHead(user, newHeadId, familyId);
    }
    async request({ user }, familyId, { about }) {
        return await this.service.request(user, familyId, { about });
    }
    async invite({ user }, familyId, userId, { about }) {
        return await this.service.invite(user, userId, familyId, { about });
    }
    async getInvitation({ user }) {
        return await this.service.getInvitation(user);
    }
    async getRequest({ user }, familyId) {
        return await this.service.getRequest(user, familyId);
    }
    async accept({ user }, familyId, id) {
        return await this.service.accept(user, familyId, id);
    }
    async decline({ user }, familyId, id) {
        return await this.service.decline(user, familyId, id);
    }
};
exports.FamilyController = FamilyController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('familyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, family_1.CreateDTO]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/head'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('familyId')),
    __param(2, (0, common_1.Query)('newHeadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "updateHead", null);
__decorate([
    (0, common_1.Post)('/request'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('familyId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, family_1.RequestDTO]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "request", null);
__decorate([
    (0, common_1.Post)('/invite'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('familyId')),
    __param(2, (0, common_1.Query)('userId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, family_1.RequestDTO]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "invite", null);
__decorate([
    (0, common_1.Get)('/invite'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getInvitation", null);
__decorate([
    (0, common_1.Get)('/request'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('familyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getRequest", null);
__decorate([
    (0, common_1.Put)('/accept'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('familyId')),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "accept", null);
__decorate([
    (0, common_1.Delete)('/decline'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('familyId')),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "decline", null);
exports.FamilyController = FamilyController = __decorate([
    (0, common_1.Controller)('family'),
    __metadata("design:paramtypes", [family_service_1.FamilyService])
], FamilyController);
//# sourceMappingURL=family.controller.js.map