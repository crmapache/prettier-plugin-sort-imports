"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonExtractor = void 0;
var commonExtractor = function (code) {
    var regExpCheck = /^(?!\/\/|\/\*).*import[\s\S]+?['"`].+/gm;
    var regExpSelect = /^[\s\S]+import[\s\S]+?['"`].+/gm;
    var match = null;
    var codeWithoutImports = code;
    if (regExpCheck.test(code) && !code.includes('@imports-sort-ignore')) {
        match = code.match(regExpSelect);
        codeWithoutImports = code.replace(regExpSelect, '');
    }
    return {
        rawImports: match && match[0],
        codeWithoutImports: codeWithoutImports,
    };
};
exports.commonExtractor = commonExtractor;
