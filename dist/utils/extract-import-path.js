"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractImportPath = void 0;
const extractImportPath = (importString) => {
    const matches = importString.match(/from.+/);
    if (matches !== null) {
        return matches[0].replace(/['"]/gm, '').replace('from', '').trim();
    }
    return importString.replace(/['"]/gm, '').replace('import', '').trim();
};
exports.extractImportPath = extractImportPath;
