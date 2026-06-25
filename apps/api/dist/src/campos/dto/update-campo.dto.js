"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCampoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_campo_dto_1 = require("./create-campo.dto");
class UpdateCampoDto extends (0, mapped_types_1.PartialType)(create_campo_dto_1.CreateCampoDto) {
}
exports.UpdateCampoDto = UpdateCampoDto;
//# sourceMappingURL=update-campo.dto.js.map