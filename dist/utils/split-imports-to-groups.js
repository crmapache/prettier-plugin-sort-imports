"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitImportsIntoGroups = void 0;
var config_1 = __importDefault(require("../config"));
var extractImportPath = function (importString) {
    var matches = importString.match(/from.+/);
    if (matches !== null) {
        return matches[0].replace(/['"]/gm, '').replace('from', '').trim();
    }
    return importString.replace(/['"]/gm, '').replace('import', '').trim();
};
var matchToUserAlias = function (importSource, aliases) {
    for (var _i = 0, aliases_1 = aliases; _i < aliases_1.length; _i++) {
        var alias = aliases_1[_i];
        if (importSource.startsWith("@".concat(alias))) {
            return true;
        }
    }
    return false;
};
var isDireactAliasImport = function (importSource, importString) {
    return importSource.startsWith('@') && !importString.includes('from');
};
var getUserAliases = function () {
    var userAliases = config_1.default.aliases;
    if (config_1.default.getAliasesFromTsConfig) {
        try {
            var tsConfig = require('../../../../tsconfig.json');
            var paths = tsConfig.compilerOptions.paths;
            if (paths) {
                return Object.keys(paths).reduce(function (result, el) {
                    var alias = el.replace(/^@|\/\*$/g, '');
                    if (result.includes(alias))
                        return result;
                    return __spreadArray(__spreadArray([], result, true), [alias], false);
                }, userAliases);
            }
        }
        catch (e) { }
    }
    return config_1.default.aliases;
};
var splitImportsIntoGroups = function (imports) {
    var libraries = [];
    var aliases = [];
    var relatives = [];
    var directRelatives = [];
    var userAliases = getUserAliases();
    for (var _i = 0, imports_1 = imports; _i < imports_1.length; _i++) {
        var importString = imports_1[_i];
        var importSource = extractImportPath(importString);
        if (((userAliases.length < 1 && importSource.startsWith('@')) ||
            matchToUserAlias(importSource, userAliases)) &&
            !isDireactAliasImport(importSource, importString)) {
            aliases.push({ raw: importString, path: importSource });
        }
        else if (importSource.startsWith('.') && importString.includes('from')) {
            relatives.push({ raw: importString, path: importSource });
        }
        else if (importSource.startsWith('.') || isDireactAliasImport(importSource, importString)) {
            directRelatives.push({ raw: importString, path: importSource });
        }
        else {
            libraries.push({ raw: importString, path: importSource });
        }
    }
    return {
        libraries: libraries,
        aliases: aliases,
        relatives: relatives,
        directRelatives: directRelatives,
    };
};
exports.splitImportsIntoGroups = splitImportsIntoGroups;
