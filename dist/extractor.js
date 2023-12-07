"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractor = void 0;
const extractor = (code) => {
    const rows = code.split('\n');
    let lastImportIndex = -1;
    let waitCloseBrace = false;
    for (let i = 0; i < rows.length; i++) {
        if (/^import\s\{$/.test(rows[i])) {
            waitCloseBrace = true;
        }
        else if (waitCloseBrace && /}.+/.test(rows[i])) {
            lastImportIndex = i;
            waitCloseBrace = false;
        }
        else if (/^import\s.+/.test(rows[i])) {
            lastImportIndex = i;
        }
    }
    let imports = [];
    let rest = [];
    if (lastImportIndex >= 0) {
        imports = rows.slice(0, lastImportIndex + 1);
        rest = rows.slice(lastImportIndex + 1);
    }
    return {
        rawImports: imports.length ? imports.join('\n') : null,
        codeWithoutImports: rest.length ? rest.join('\n') : code,
    };
};
exports.extractor = extractor;
