"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_babel_1 = require("prettier/parser-babel");
const parser_typescript_1 = require("prettier/parser-typescript");
const preprocess_1 = require("./preprocess");
module.exports = {
    parsers: {
        typescript: Object.assign(Object.assign({}, parser_typescript_1.parsers.typescript), { preprocess: preprocess_1.preprocess }),
        babel: Object.assign(Object.assign({}, parser_babel_1.parsers.babel), { preprocess: preprocess_1.preprocess }),
    },
};
