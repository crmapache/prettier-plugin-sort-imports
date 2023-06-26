"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeBeforeImports = void 0;
var getCodeBeforeImports = function (code) {
    var result = code.match(/^[\s\S]+?import/m);
    if (result && result[0]) {
        return result[0].replace(/import([\s\S]+)?/, '');
    }
    return '';
};
exports.getCodeBeforeImports = getCodeBeforeImports;
