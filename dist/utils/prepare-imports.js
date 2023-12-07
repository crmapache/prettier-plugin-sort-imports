"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareImports = void 0;
const prepareImports = (importGroups) => {
    let result = '';
    for (const importData of importGroups.libraries) {
        result += `${importData.raw}\n`;
    }
    result += '\n';
    for (const importData of importGroups.aliases) {
        result += `${importData.raw}\n`;
    }
    result += '\n';
    for (const importData of importGroups.relatives) {
        result += `${importData.raw}\n`;
    }
    if (importGroups.directRelatives.length > 0) {
        result += '\n';
        for (const importData of importGroups.directRelatives) {
            result += `${importData.raw}\n`;
        }
    }
    return result;
};
exports.prepareImports = prepareImports;
