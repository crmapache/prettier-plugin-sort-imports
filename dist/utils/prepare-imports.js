"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareImports = void 0;
const joinGroup = (items) => items.map((x) => x.raw.trimEnd()).join('\n');
const prepareImports = (importGroups) => {
    const parts = [];
    if (importGroups.libraries.length)
        parts.push(joinGroup(importGroups.libraries));
    if (importGroups.aliases.length)
        parts.push(joinGroup(importGroups.aliases));
    if (importGroups.relatives.length)
        parts.push(joinGroup(importGroups.relatives));
    if (importGroups.directRelatives.length)
        parts.push(joinGroup(importGroups.directRelatives));
    return parts.join('\n\n');
};
exports.prepareImports = prepareImports;
