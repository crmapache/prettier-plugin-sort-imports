import {
  splitImports,
  prepareImports,
  getUserAliases,
  sortImportGroups,
  prepareFinalCode,
  splitImportsIntoGroups,
} from './utils'
import { ImportGroups } from './types'
import { extractor } from './extractor'

export const preprocess = (code: string) => {
  const userAliases = getUserAliases()

  const { rawImports, codeWithoutImports } = extractor(code)

  if (rawImports) {
    const { preImportsData, imports } = splitImports(rawImports)

    const importGroups: ImportGroups = splitImportsIntoGroups(imports, userAliases)
    const sortedImportGroups = sortImportGroups(importGroups)
    const preparedImports = prepareImports(sortedImportGroups)

    const safeCodeWithoutImports = codeWithoutImports === code ? '' : codeWithoutImports
    return prepareFinalCode(preImportsData, preparedImports, safeCodeWithoutImports)
  }

  return code
}
