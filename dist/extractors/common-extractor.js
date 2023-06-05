"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonExtractor = void 0;
var commonExtractor = function (code) {
    return code.match(/^import[\s\S]+?['"`].+/gm) || [];
};
exports.commonExtractor = commonExtractor;
