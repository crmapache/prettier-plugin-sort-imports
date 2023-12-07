import { Import, ImportData, ImportGroups, UserAlias } from '../types'
import { extractImportPath } from './extract-import-path'

const matchToUserAlias = (importSource: string, userAliases: UserAlias[]) => {
  for (const userAlias of userAliases) {
    if (importSource.startsWith(`@${userAlias.name}`)) {
      return true
    }
  }

  return false
}

const isDireactAliasImport = (importSource: string, importString: string) => {
  return importSource.startsWith('@') && !importString.includes('from')
}

export const splitImportsIntoGroups = (
  imports: Import[],
  userAliases: UserAlias[],
): ImportGroups => {
  const libraries: ImportData[] = []
  const aliases: ImportData[] = []
  const relatives: ImportData[] = []
  const directRelatives: ImportData[] = []

  for (const importString of imports) {
    const importSource = extractImportPath(importString)

    if (
      ((userAliases.length < 1 && importSource.startsWith('@')) ||
        matchToUserAlias(importSource, userAliases)) &&
      !isDireactAliasImport(importSource, importString)
    ) {
      aliases.push({ raw: importString, path: importSource })
    } else if (importSource.startsWith('.') && importString.includes('from')) {
      relatives.push({ raw: importString, path: importSource })
    } else if (importSource.startsWith('.') || isDireactAliasImport(importSource, importString)) {
      directRelatives.push({ raw: importString, path: importSource })
    } else {
      libraries.push({ raw: importString, path: importSource })
    }
  }

  return {
    libraries,
    aliases,
    relatives,
    directRelatives,
  }
}
