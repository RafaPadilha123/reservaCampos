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
exports.CamposService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CamposService = class CamposService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.campo.create({
            data: {
                nome: data.nome,
                tipo_grama: data.tipo_grama,
                preco_hora: data.preco_hora,
            },
        });
    }
    async findAll() {
        return this.prisma.campo.findMany();
    }
    async findOne(id) {
        const campo = await this.prisma.campo.findUnique({ where: { id } });
        if (!campo)
            throw new common_1.NotFoundException('Campo não encontrado.');
        return campo;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.campo.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.campo.delete({ where: { id } });
    }
};
exports.CamposService = CamposService;
exports.CamposService = CamposService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CamposService);
//# sourceMappingURL=campos.service.js.map