"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_babel_1 = require("prettier/parser-babel");
var parser_typescript_1 = require("prettier/parser-typescript");
var preprocess_1 = require("./preprocess");
module.exports = {
    parsers: {
        typescript: __assign(__assign({}, parser_typescript_1.parsers.typescript), { preprocess: preprocess_1.preprocess }),
        babel: __assign(__assign({}, parser_babel_1.parsers.babel), { preprocess: preprocess_1.preprocess }),
    },
};
