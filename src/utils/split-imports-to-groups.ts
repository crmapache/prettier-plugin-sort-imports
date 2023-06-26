import config from '../config'
import { Config, Import, ImportData, ImportGroups } from '../types'

const extractImportPath = (importString: string): string => {
  const matches = importString.match(/from.+/)

  if (matches !== null) {
    return matches[0].replace(/['"]/gm, '').replace('from', '').trim()
  }

  return importString.replace(/['"]/gm, '').replace('import', '').trim()
}

const matchToUserAlias = (importSource: string, aliases: Config['aliases']) => {
  for (const alias of aliases) {
    if (importSource.startsWith(`@${alias}`)) {
      return true
    }
  }

  return false
}

const isDireactAliasImport = (importSource: string, importString: string) => {
  return importSource.startsWith('@') && !importString.includes('from')
}

export const splitImportsIntoGroups = (imports: Import[]): ImportGroups => {
  const libraries: ImportData[] = []
  const aliases: ImportData[] = []
  const relatives: ImportData[] = []
  const directRelatives: ImportData[] = []
  const userAliases = config.aliases

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
