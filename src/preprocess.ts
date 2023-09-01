import {
  prepareImports,
  sortImportGroups,
  splitImports,
  splitImportsIntoGroups,
  prepareFinalCode,
} from './utils'
import { ImportGroups } from './types'
import { commonExtractor } from './extractors'

export const preprocess = (code: string) => {
  const { rawImports, codeWithoutImports } = commonExtractor(code)

  if (rawImports) {
    const { preImportsData, imports } = splitImports(rawImports)

    const importGroups: ImportGroups = splitImportsIntoGroups(imports)
    const sortedImportGroups = sortImportGroups(importGroups)
    const preparedImports = prepareImports(sortedImportGroups)

    return prepareFinalCode(preImportsData, preparedImports, codeWithoutImports)
  }

  return code
}
