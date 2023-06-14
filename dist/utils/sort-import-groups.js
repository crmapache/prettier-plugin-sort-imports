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
exports.sortImportGroups = void 0;
var config_1 = __importDefault(require("../config"));
var types_1 = require("../types");
var getImportDepth = function (path) {
    return path.split('/').length;
};
var asc = function (a, b) {
    var depthA = getImportDepth(a.path);
    var depthB = getImportDepth(b.path);
    if (depthA !== depthB) {
        return depthA - depthB;
    }
    else {
        return a.path.localeCompare(b.path);
    }
};
var desc = function (a, b) {
    var depthA = getImportDepth(a.path);
    var depthB = getImportDepth(b.path);
    if (depthA !== depthB) {
        return depthB - depthA;
    }
    else {
        return a.path.localeCompare(b.path);
    }
};
var sortLibraries = function (imports) {
    var result = [];
    var groups = {};
    for (var _i = 0, _a = config_1.default.libs; _i < _a.length; _i++) {
        var library = _a[_i];
        groups[library.name] = [];
        for (var i = 0; i < imports.length; i++) {
            var importData = imports[i];
            if ((library.rule === types_1.LibraryRule.EXACT && importData.path === library.name) ||
                (library.rule === types_1.LibraryRule.STARTS && importData.path.startsWith(library.name)) ||
                (library.rule === types_1.LibraryRule.INCLUDES && importData.path.includes(library.name))) {
                groups[library.name].push(importData);
                imports.splice(i, 1);
                i--;
            }
        }
    }
    for (var groupKey in groups) {
        groups[groupKey].sort(asc);
        result = __spreadArray(__spreadArray([], result, true), groups[groupKey], true);
    }
    imports.sort(asc);
    result = __spreadArray(__spreadArray([], result, true), imports, true);
    return destructuringSort(result);
};
var sortAliases = function (imports) {
    var sortedImports = imports.sort(asc);
    return destructuringSort(sortedImports);
};
var sortRelatives = function (imports) {
    var outFolderImports = [];
    var currentFolderImports = [];
    for (var _i = 0, imports_1 = imports; _i < imports_1.length; _i++) {
        var importData = imports_1[_i];
        if (importData.path.startsWith('./')) {
            currentFolderImports.push(importData);
        }
        else {
            outFolderImports.push(importData);
        }
    }
    outFolderImports.sort(desc);
    currentFolderImports.sort(desc);
    return destructuringSort(outFolderImports.concat(currentFolderImports));
};
var destructuringSort = function (imports) {
    var result = [];
    for (var _i = 0, imports_2 = imports; _i < imports_2.length; _i++) {
        var importData = imports_2[_i];
        var searchResult = importData.raw.match(/\{[\s\S]+?}/gm);
        if (searchResult) {
            var importElementsString = searchResult[0].replace(/[{}\s]/gm, '');
            var importElements = importElementsString
                .split(',')
                .filter(function (importElement) { return importElement; });
            importElements.sort(function (a, b) {
                if (a.length === b.length) {
                    return a.localeCompare(b);
                }
                else {
                    return a.length - b.length;
                }
            });
            result.push({
                raw: importData.raw.replace(/\{[\s\S]+?}/gm, "{ ".concat(importElements.join(','), " }")),
                path: importData.path,
            });
        }
        else {
            result.push(importData);
        }
    }
    return result;
};
var sortImportGroups = function (inputGroups) {
    return {
        libraries: sortLibraries(inputGroups.libraries),
        aliases: sortAliases(inputGroups.aliases),
        relatives: sortRelatives(inputGroups.relatives),
        directRelatives: sortRelatives(inputGroups.directRelatives),
    };
};
exports.sortImportGroups = sortImportGroups;
