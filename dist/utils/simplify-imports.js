"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyImports = void 0;
const extract_import_path_1 = require("./extract-import-path");
const simplifyImports = (imports, userAliases, filepath) => {
    const result = [];
    const rootFolderPath = process.cwd();
    const targetFileFolderPath = `${rootFolderPath}/${filepath.replace(/\/([^/]+)$/, '').replace(/.+src/, 'src')}`;
    for (const rawImport of imports) {
        const importPath = (0, extract_import_path_1.extractImportPath)(rawImport).replace(/;$/, '');
        if (importPath.startsWith('@')) {
            const clearedPath = importPath.replace(/^@|\/.+$/g, '');
            const userAliase = userAliases.find((userAliase) => userAliase.name === clearedPath);
            if (userAliase) {
                let preparedPath = userAliase.path;
                if (importPath.match(/^@.+?\//)) {
                    preparedPath = importPath.replace(/^@.+?\//, `${userAliase.path}/`);
                }
                const path = `${rootFolderPath}/src/${preparedPath}`;
                if (path.includes(targetFileFolderPath)) {
                    result.push(rawImport.replace(importPath, path.replace(targetFileFolderPath, '.')));
                    continue;
                }
            }
        }
        result.push(rawImport);
    }
    return result;
};
exports.simplifyImports = simplifyImports;
