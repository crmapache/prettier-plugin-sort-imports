"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
var utils_1 = require("./utils");
var extractors_1 = require("./extractors");
var replace_imports_1 = require("./utils/replace-imports");
var preprocess = function (code) {
    var imports = (0, extractors_1.commonExtractor)(code);
    var importGroups = (0, utils_1.splitImportsIntoGroups)(imports);
    var sortedImportGroups = (0, utils_1.sortImportGroups)(importGroups);
    var preparedCode = (0, utils_1.prepareCode)(sortedImportGroups);
    return (0, replace_imports_1.replaceImports)(preparedCode, code);
};
exports.preprocess = preprocess;
