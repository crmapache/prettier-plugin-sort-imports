"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAliases = void 0;
const fs_1 = __importDefault(require("fs"));
const getUserAliases = () => {
    const aliasesData = [];
    try {
        const tsConfigBuffer = fs_1.default.readFileSync(`${process.cwd()}/tsconfig.json`);
        const tsConfigString = tsConfigBuffer.toString('utf8');
        const cleredTsConfigString = tsConfigString.replace(/[\s\n]/gm, '').replace(',}', '}');
        const tsConfig = JSON.parse(cleredTsConfigString);
        const paths = tsConfig.compilerOptions.paths;
        if (paths) {
            for (const data of Object.entries(paths)) {
                const aliasName = data[0];
                const aliasPath = data[1][0];
                const alias = aliasName.replace(/^@|\/\*$/g, '');
                if (!aliasesData.find((el) => el.name === alias)) {
                    aliasesData.push({
                        name: alias,
                        path: aliasPath,
                    });
                }
            }
        }
    }
    catch (e) { }
    return aliasesData;
};
exports.getUserAliases = getUserAliases;
