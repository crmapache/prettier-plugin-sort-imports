import fs from "fs";

import {UserAlias} from "../types";

export const getUserAliases = (): UserAlias[] => {
  const aliasesData: UserAlias[] = []

  try {
    const tsConfigBuffer = fs.readFileSync(`${process.cwd()}/tsconfig.json`)
    const tsConfigString = tsConfigBuffer.toString('utf8');
    const cleredTsConfigString = tsConfigString.replace(/[\s\n]/gm, '').replace(',}', '}')
    const tsConfig = JSON.parse(cleredTsConfigString);

    const paths = tsConfig.compilerOptions.paths

    if (paths) {
      for (const data of Object.entries(paths)) {
        const aliasName = data[0]
        const aliasPath = data[1][0]

        const alias = aliasName.replace(/^@|\/\*$/g, '')

        if (!aliasesData.find(el => el.name === alias)) {
          aliasesData.push({
            name: alias,
            path: aliasPath
          })
        }
      }
    }
  } catch (e) {}

  return aliasesData
}
