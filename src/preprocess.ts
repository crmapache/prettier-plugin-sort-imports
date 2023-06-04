import { prepareCode, sortImportGroups, splitImportsIntoGroups } from './utils'
import { ImportGroups } from './types'
import { commonExtractor } from './extractors'
import { replaceImports } from './utils/replace-imports'

export const preprocess = (code: string) => {
  const imports = commonExtractor(code)
  const importGroups: ImportGroups = splitImportsIntoGroups(imports)
  const sortedImportGroups = sortImportGroups(importGroups)
  const preparedCode = prepareCode(sortedImportGroups)

  return replaceImports(preparedCode, code)
}
