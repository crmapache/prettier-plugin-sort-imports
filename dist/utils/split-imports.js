"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitImports = void 0;
var clearImportFromComments = function (row) {
    return row
        .replace(/\/\*[\s\S]*?\*\//gm, '')
        .replace(/\/\/.+$/gm, '')
        .replace(/^[ \t]*\n/gm, '');
};
var splitImports = function (rawImports) {
    var rawImportsData = rawImports;
    var singleLineRegExp = /^import.+['"`]$/gm;
    var singleLineImports = rawImports.match(singleLineRegExp);
    rawImportsData = rawImportsData.replace(singleLineRegExp, '');
    var multiLineRegExp = /^import\s*{(\s*[\w\s,/\n]*\s*)}\s*from\s*['"].+['"].*$/gm;
    var multiLineImports = rawImportsData.match(multiLineRegExp);
    rawImportsData = rawImportsData.replace(multiLineRegExp, '');
    rawImportsData = rawImportsData.replace(/^\n/gm, '');
    var imports = [];
    if (singleLineImports && singleLineImports.length > 0) {
        for (var _i = 0, singleLineImports_1 = singleLineImports; _i < singleLineImports_1.length; _i++) {
            var singleLineImport = singleLineImports_1[_i];
            imports.push(clearImportFromComments(singleLineImport));
        }
    }
    if (multiLineImports && multiLineImports.length > 0) {
        for (var _a = 0, multiLineImports_1 = multiLineImports; _a < multiLineImports_1.length; _a++) {
            var multiLineImport = multiLineImports_1[_a];
            imports.push(clearImportFromComments(multiLineImport));
        }
    }
    return {
        preImportsData: rawImportsData,
        imports: imports,
    };
};
exports.splitImports = splitImports;
