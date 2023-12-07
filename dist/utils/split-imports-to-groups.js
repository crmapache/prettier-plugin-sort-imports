"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitImportsIntoGroups = void 0;
const extract_import_path_1 = require("./extract-import-path");
const matchToUserAlias = (importSource, userAliases) => {
    for (const userAlias of userAliases) {
        if (importSource.startsWith(`@${userAlias.name}`)) {
            return true;
        }
    }
    return false;
};
const isDireactAliasImport = (importSource, importString) => {
    return importSource.startsWith('@') && !importString.includes('from');
};
const splitImportsIntoGroups = (imports, userAliases) => {
    const libraries = [];
    const aliases = [];
    const relatives = [];
    const directRelatives = [];
    for (const importString of imports) {
        const importSource = (0, extract_import_path_1.extractImportPath)(importString);
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
        libraries,
        aliases,
        relatives,
        directRelatives,
    };
};
exports.splitImportsIntoGroups = splitImportsIntoGroups;
