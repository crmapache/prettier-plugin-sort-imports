import { ImportData, ImportGroups, LIBRARY_RULE } from '../types'
import { libraries } from '../constants'

const getImportDepth = (path: string) => {
  return path.split('/').length
}

const asc = (a, b) => {
  const depthA = getImportDepth(a.path)
  const depthB = getImportDepth(b.path)

  if (depthA !== depthB) {
    return depthA - depthB
  } else {
    return a.path.localeCompare(b.path)
  }
}

const desc = (a, b) => {
  const depthA = getImportDepth(a.path)
  const depthB = getImportDepth(b.path)

  if (depthA !== depthB) {
    return depthB - depthA
  } else {
    return a.path.localeCompare(b.path)
  }
}

const sortLibraries = (imports: ImportData[]) => {
  let result = []
  const groups = {}

  for (const library of libraries) {
    groups[library.name] = []

    for (let i = 0; i < imports.length; i++) {
      const importData = imports[i]

      if (
        (library.rule === LIBRARY_RULE.EXACT && importData.path === library.name) ||
        (library.rule === LIBRARY_RULE.STARTS && importData.path.startsWith(library.name)) ||
        (library.rule === LIBRARY_RULE.INCLUDES && importData.path.includes(library.name))
      ) {
        groups[library.name].push(importData)
        imports.splice(i, 1)
        i--
      }
    }
  }

  for (const groupKey in groups) {
    groups[groupKey].sort(asc)
    result = [...result, ...groups[groupKey]]
  }

  imports.sort(asc)

  result = [...result, ...imports]

  return result
}

const sortAliases = (imports) => imports.sort(asc)

const sortRelatives = (imports) => {
  const outFolderImports = []
  const currentFolderImports = []

  for (const importData of imports) {
    if (importData.path.startsWith('./')) {
      currentFolderImports.push(importData)
    } else {
      outFolderImports.push(importData)
    }
  }

  outFolderImports.sort(desc)
  currentFolderImports.sort(desc)

  return outFolderImports.concat(currentFolderImports)
}

export const sortImportGroups = (inputGroups: ImportGroups) => {
  return {
    libraries: sortLibraries(inputGroups.libraries),
    aliases: sortAliases(inputGroups.aliases),
    relatives: sortRelatives(inputGroups.relatives),
    directRelatives: sortRelatives(inputGroups.directRelatives),
  }
}
