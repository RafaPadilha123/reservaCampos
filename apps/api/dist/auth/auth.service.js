"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    users = [];
    async register(dto) {
        const userExists = this.users.find(u => u.email === dto.email);
        if (userExists) {
            throw new common_1.BadRequestException('E-mail já cadastrado.');
        }
        const newUser = {
            id: this.users.length + 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
            role: dto.role || 'CLIENT',
        };
        this.users.push(newUser);
        const { password, ...result } = newUser;
        return result;
    }
    async login(email, passwordInput) {
        const user = this.users.find(u => u.email === email);
        if (!user || user.password !== passwordInput) {
            throw new common_1.UnauthorizedException('Credenciais inválidas.');
        }
        return {
            access_token: `mock_jwt_token_for_user_${user.id}`,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map