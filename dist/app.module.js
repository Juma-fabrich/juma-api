"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt-strategy");
const user_module_1 = require("./user/user.module");
const family_module_1 = require("./family/family.module");
const message_module_1 = require("./message/message.module");
const post_module_1 = require("./post/post.module");
const socket_module_1 = require("./socket/socket.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '3d' }
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            user_module_1.UserModule,
            family_module_1.FamilyModule,
            message_module_1.MessageModule,
            post_module_1.PostModule,
            socket_module_1.SocketModule,
        ],
        providers: [jwt_strategy_1.JwtStrategy, jwt_1.JwtService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map