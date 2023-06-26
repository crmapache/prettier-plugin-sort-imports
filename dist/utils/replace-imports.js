"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceImports = void 0;
var get_code_before_imports_1 = require("./get-code-before-imports");
var replaceImports = function (imports, code) {
    var codeBeforeImports = (0, get_code_before_imports_1.getCodeBeforeImports)(code);
    var codeWithoutImports = code.replace(/^import[\s\S]+?['"`].+/gm, '');
    if (codeBeforeImports) {
        codeWithoutImports = codeWithoutImports.replace(codeBeforeImports, '');
        return "".concat(codeBeforeImports, "\n").concat(imports, "\n").concat(codeWithoutImports);
    }
    return "".concat(imports, "\n").concat(codeWithoutImports);
};
exports.replaceImports = replaceImports;
