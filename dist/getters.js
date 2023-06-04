"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtractor = void 0;
var extractors_1 = require("./extractors");
var config;
try {
    config = require('./../../sort-imports.config.ts');
}
catch (error) {
    config = {
        extractor: extractors_1.commonExtractor,
    };
}
var getExtractor = function () {
    return config.extractor;
};
exports.getExtractor = getExtractor;
