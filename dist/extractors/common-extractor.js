"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonExtractor = void 0;
var commonExtractor = function (code) {
    var regExp = /^[\s\S]+import[\s\S]+?['"`].+/gm;
    var match = code.match(regExp);
    return {
        rawImports: match && match[0],
        codeWithoutImports: code.replace(regExp, ''),
    };
};
exports.commonExtractor = commonExtractor;
