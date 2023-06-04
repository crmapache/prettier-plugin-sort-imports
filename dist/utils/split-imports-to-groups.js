"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitImportsIntoGroups = void 0;
var extractImportPath = function (importString) {
    var matches = importString.match(/from.+/);
    if (matches !== null) {
        return matches[0].replace(/['"]/gm, '').replace('from', '').trim();
    }
    return importString.replace(/['"]/gm, '').replace('import', '').trim();
};
var splitImportsIntoGroups = function (imports) {
    var libraries = [];
    var aliases = [];
    var relatives = [];
    var directRelatives = [];
    for (var _i = 0, imports_1 = imports; _i < imports_1.length; _i++) {
        var importString = imports_1[_i];
        var importSource = extractImportPath(importString);
        if (importSource.startsWith('@')) {
            aliases.push({ raw: importString, path: importSource });
        }
        else if (importSource.startsWith('.') && importString.includes('from')) {
            relatives.push({ raw: importString, path: importSource });
        }
        else if (importSource.startsWith('.')) {
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
