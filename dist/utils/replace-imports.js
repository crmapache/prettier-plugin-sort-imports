"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceImports = void 0;
var replaceImports = function (imports, code) {
    var codeWithoutImports = code.replace(/^import[\s\S]+?['"`].+/gm, '');
    return "".concat(imports, "\n").concat(codeWithoutImports);
};
exports.replaceImports = replaceImports;
