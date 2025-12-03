"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareFinalCode = void 0;
const stripLeadingEmptyLines = (s) => s.replace(/^(?:[ \t]*\n)+/, '');
const prepareFinalCode = (preImportsData, preparedImports, codeWithoutImports) => {
    const pre = preImportsData.trimEnd();
    const imports = preparedImports.trimEnd();
    const rest = stripLeadingEmptyLines(codeWithoutImports);
    let out = '';
    if (pre)
        out += pre + '\n';
    out += imports;
    if (rest)
        out += '\n\n' + rest;
    return out;
};
exports.prepareFinalCode = prepareFinalCode;
