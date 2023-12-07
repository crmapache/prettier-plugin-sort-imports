"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    libs: [
        {
            name: 'react',
            rule: 'exact',
        },
        {
            name: 'next',
            rule: 'starts',
        },
    ],
    aliases: [],
    getAliasesFromTsConfig: true,
};
try {
    const userConfig = require('../../../sort-plugin.config.js');
    if (userConfig.libs) {
        config.libs = userConfig.libs;
    }
    if (userConfig.aliases) {
        config.aliases = userConfig.aliases;
    }
}
catch (e) { }
exports.default = config;
