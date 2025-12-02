"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitImports = void 0;
const clearImportFromComments = (row) => row
    .replace(/\/\*[\s\S]*?\*\//gm, '')
    .replace(/\/\/.+$/gm, '')
    .replace(/^[ \t]*\n/gm, '');
const splitImports = (rawImports) => {
    let rawImportsData = rawImports;
    const imports = [];
    const singleLineRegExp = /^import.+['"`]$/gm;
    rawImportsData = rawImportsData.replace(singleLineRegExp, (match) => {
        imports.push(clearImportFromComments(match));
        return '';
    });
    const multiLineRegExp = /^import\s*{(\s*[\w\s,/\n]*\s*)}\s*from\s*['"].+['"].*$/gm;
    rawImportsData = rawImportsData.replace(multiLineRegExp, (match) => {
        imports.push(clearImportFromComments(match));
        return '';
    });
    rawImportsData = rawImportsData.replace(/^\n/gm, '');
    return {
        preImportsData: rawImportsData,
        imports,
    };
};
exports.splitImports = splitImports;
