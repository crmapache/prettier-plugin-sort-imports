import {
  splitImports,
  prepareImports,
  getUserAliases,
  simplifyImports,
  sortImportGroups,
  prepareFinalCode,
  splitImportsIntoGroups,
} from './utils'
import { ImportGroups } from './types'
import { extractor } from './extractor'

export const preprocess = (code: string, { filepath }) => {
  const userAliases = getUserAliases()

  const { rawImports, codeWithoutImports } = extractor(code)

  if (rawImports) {
    const { preImportsData, imports } = splitImports(rawImports)

    const simplifyedImports = simplifyImports(imports, userAliases, filepath)

    const importGroups: ImportGroups = splitImportsIntoGroups(simplifyedImports, userAliases)
    const sortedImportGroups = sortImportGroups(importGroups)
    const preparedImports = prepareImports(sortedImportGroups)

    return prepareFinalCode(preImportsData, preparedImports, codeWithoutImports)
  }

  return code
}
