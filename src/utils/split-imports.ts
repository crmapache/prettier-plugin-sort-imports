const clearImportFromComments = (row: string) =>
  row
    .replace(/\/\*[\s\S]*?\*\//gm, '')
    .replace(/\/\/.+$/gm, '')
    .replace(/^[ \t]*\n/gm, '')

export const splitImports = (rawImports: string) => {
  let rawImportsData = rawImports

  const singleLineRegExp = /^import.+['"`]$/gm
  const singleLineImports = rawImports.match(singleLineRegExp)
  rawImportsData = rawImportsData.replace(singleLineRegExp, '')

  const multiLineRegExp = /^import\s*{(\s*[\w\s,/\n]*\s*)}\s*from\s*['"].+['"].*$/gm
  const multiLineImports = rawImportsData.match(multiLineRegExp)
  rawImportsData = rawImportsData.replace(multiLineRegExp, '')
  rawImportsData = rawImportsData.replace(/^\n/gm, '')

  const imports: string[] = []

  if (singleLineImports && singleLineImports.length > 0) {
    for (const singleLineImport of singleLineImports) {
      imports.push(clearImportFromComments(singleLineImport))
    }
  }

  if (multiLineImports && multiLineImports.length > 0) {
    for (const multiLineImport of multiLineImports) {
      imports.push(clearImportFromComments(multiLineImport))
    }
  }

  return {
    preImportsData: rawImportsData,
    imports,
  }
}
