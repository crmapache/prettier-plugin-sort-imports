"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareFinalCode = void 0;
const prepareFinalCode = (preImportsData, preparedImports, codeWithoutImports) => {
    return `${preImportsData}\n${preparedImports}\n${codeWithoutImports}`;
};
exports.prepareFinalCode = prepareFinalCode;
