"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonExtractor = void 0;
var commonExtractor = function (code) {
    var splittedRows = code.split('\n');
    var lastImportIndex = -1;
    var waitCloseBrace = false;
    for (var i = 0; i < splittedRows.length; i++) {
        if (/^import\s\{$/.test(splittedRows[i])) {
            waitCloseBrace = true;
        }
        else if (waitCloseBrace && /}.+/.test(splittedRows[i])) {
            lastImportIndex = i;
            waitCloseBrace = false;
        }
        else if (/^import\s.+/.test(splittedRows[i])) {
            lastImportIndex = i;
        }
    }
    var imports = [];
    var rest = [];
    if (lastImportIndex >= 0) {
        imports = splittedRows.slice(0, lastImportIndex + 1);
        rest = splittedRows.slice(lastImportIndex + 1);
    }
    return {
        rawImports: imports.length ? imports.join('\n') : null,
        codeWithoutImports: rest.length ? rest.join('\n') : code,
    };
};
exports.commonExtractor = commonExtractor;
