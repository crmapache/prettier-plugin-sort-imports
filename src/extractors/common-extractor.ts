export const commonExtractor = (code: string) => {
  const splittedRows = code.split('\n')

  let lastImportIndex = -1
  let waitCloseBrace = false

  for (let i = 0; i < splittedRows.length; i++) {
    if (/^import\s\{$/.test(splittedRows[i])) {
      waitCloseBrace = true
    } else if (waitCloseBrace && /}.+/.test(splittedRows[i])) {
      lastImportIndex = i
      waitCloseBrace = false
    } else if (/^import\s.+/.test(splittedRows[i])) {
      lastImportIndex = i
    }
  }

  let imports = []
  let rest = []

  if (lastImportIndex >= 0) {
    imports = splittedRows.slice(0, lastImportIndex + 1)
    rest = splittedRows.slice(lastImportIndex + 1)
  }

  return {
    rawImports: imports.length ? imports.join('\n') : null,
    codeWithoutImports: rest.length ? rest.join('\n') : code,
  }
}
