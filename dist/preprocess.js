"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const utils_1 = require("./utils");
const extractor_1 = require("./extractor");
const preprocess = (code) => {
    const userAliases = (0, utils_1.getUserAliases)();
    const { rawImports, codeWithoutImports } = (0, extractor_1.extractor)(code);
    if (rawImports) {
        const { preImportsData, imports } = (0, utils_1.splitImports)(rawImports);
        const importGroups = (0, utils_1.splitImportsIntoGroups)(imports, userAliases);
        const sortedImportGroups = (0, utils_1.sortImportGroups)(importGroups);
        const preparedImports = (0, utils_1.prepareImports)(sortedImportGroups);
        const safeCodeWithoutImports = codeWithoutImports === code ? '' : codeWithoutImports;
        return (0, utils_1.prepareFinalCode)(preImportsData, preparedImports, safeCodeWithoutImports);
    }
    return code;
};
exports.preprocess = preprocess;
