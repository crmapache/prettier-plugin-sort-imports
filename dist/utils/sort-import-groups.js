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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortImportGroups = void 0;
var types_1 = require("../types");
var constants_1 = require("../constants");
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
    for (var _i = 0, libraries_1 = constants_1.libraries; _i < libraries_1.length; _i++) {
        var library = libraries_1[_i];
        groups[library.name] = [];
        for (var i = 0; i < imports.length; i++) {
            var importData = imports[i];
            if ((library.rule === types_1.LIBRARY_RULE.EXACT && importData.path === library.name) ||
                (library.rule === types_1.LIBRARY_RULE.STARTS && importData.path.startsWith(library.name)) ||
                (library.rule === types_1.LIBRARY_RULE.INCLUDES && importData.path.includes(library.name))) {
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
    return result;
};
var sortAliases = function (imports) { return imports.sort(asc); };
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
    return outFolderImports.concat(currentFolderImports);
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
