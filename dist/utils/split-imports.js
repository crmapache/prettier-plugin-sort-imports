"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitImports = void 0;
const clearImportFromComments = (row) => row
    .replace(/\/\*[\s\S]*?\*\//gm, '')
    .replace(/\/\/.+$/gm, '')
    .replace(/^[ \t]*\n/gm, '');
const splitImports = (rawImports) => {
    let rawImportsData = rawImports;
    const singleLineRegExp = /^import.+['"`]$/gm;
    const singleLineImports = rawImports.match(singleLineRegExp);
    rawImportsData = rawImportsData.replace(singleLineRegExp, '');
    const multiLineRegExp = /^import\s*{(\s*[\w\s,/\n]*\s*)}\s*from\s*['"].+['"].*$/gm;
    const multiLineImports = rawImportsData.match(multiLineRegExp);
    rawImportsData = rawImportsData.replace(multiLineRegExp, '');
    rawImportsData = rawImportsData.replace(/^\n/gm, '');
    const imports = [];
    if (singleLineImports && singleLineImports.length > 0) {
        for (const singleLineImport of singleLineImports) {
            imports.push(clearImportFromComments(singleLineImport));
        }
    }
    if (multiLineImports && multiLineImports.length > 0) {
        for (const multiLineImport of multiLineImports) {
            imports.push(clearImportFromComments(multiLineImport));
        }
    }
    return {
        preImportsData: rawImportsData,
        imports,
    };
};
exports.splitImports = splitImports;
