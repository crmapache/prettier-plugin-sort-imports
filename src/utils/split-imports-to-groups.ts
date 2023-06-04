import { Import, ImportData, ImportGroups } from '../types'

const extractImportPath = (importString: string): string => {
  const matches = importString.match(/from.+/)

  if (matches !== null) {
    return matches[0].replace(/['"]/gm, '').replace('from', '').trim()
  }

  return importString.replace(/['"]/gm, '').replace('import', '').trim()
}

export const splitImportsIntoGroups = (imports: Import[]): ImportGroups => {
  const libraries: ImportData[] = []
  const aliases: ImportData[] = []
  const relatives: ImportData[] = []
  const directRelatives: ImportData[] = []

  for (const importString of imports) {
    const importSource = extractImportPath(importString)

    if (importSource.startsWith('@')) {
      aliases.push({ raw: importString, path: importSource })
    } else if (importSource.startsWith('.') && importString.includes('from')) {
      relatives.push({ raw: importString, path: importSource })
    } else if (importSource.startsWith('.')) {
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
