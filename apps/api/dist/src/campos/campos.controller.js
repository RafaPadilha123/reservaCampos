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
exports.CamposController = void 0;
const common_1 = require("@nestjs/common");
const campos_service_1 = require("./campos.service");
let CamposController = class CamposController {
    camposService;
    constructor(camposService) {
        this.camposService = camposService;
    }
    create(createCampoDto, role) {
        if (role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('Apenas administradores podem cadastrar campos.');
        }
        return this.camposService.create(createCampoDto);
    }
    findAll() {
        return this.camposService.findAll();
    }
    findOne(id) {
        return this.camposService.findOne(Number(id));
    }
    update(id, updateCampoDto) {
        return this.camposService.update(Number(id), updateCampoDto);
    }
    remove(id) {
        return this.camposService.remove(Number(id));
    }
};
exports.CamposController = CamposController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-user-role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "remove", null);
exports.CamposController = CamposController = __decorate([
    (0, common_1.Controller)('campos'),
    __metadata("design:paramtypes", [campos_service_1.CamposService])
], CamposController);
//# sourceMappingURL=campos.controller.js.map