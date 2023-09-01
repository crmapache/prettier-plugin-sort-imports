"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
var utils_1 = require("./utils");
var extractors_1 = require("./extractors");
var preprocess = function (code) {
    var _a = (0, extractors_1.commonExtractor)(code), rawImports = _a.rawImports, codeWithoutImports = _a.codeWithoutImports;
    if (rawImports) {
        var _b = (0, utils_1.splitImports)(rawImports), preImportsData = _b.preImportsData, imports = _b.imports;
        var importGroups = (0, utils_1.splitImportsIntoGroups)(imports);
        var sortedImportGroups = (0, utils_1.sortImportGroups)(importGroups);
        var preparedImports = (0, utils_1.prepareImports)(sortedImportGroups);
        return (0, utils_1.prepareFinalCode)(preImportsData, preparedImports, codeWithoutImports);
    }
    return code;
};
exports.preprocess = preprocess;
