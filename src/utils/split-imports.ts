const clearImportFromComments = (row: string) =>
  row
    .replace(/\/\*[\s\S]*?\*\//gm, '')
    .replace(/\/\/.+$/gm, '')
    .replace(/^[ \t]*\n/gm, '')

export const splitImports = (rawImports: string) => {
  let rawImportsData = rawImports
  const imports: string[] = []

  const singleLineRegExp = /^import.+['"`]$/gm
  rawImportsData = rawImportsData.replace(singleLineRegExp, (match) => {
    imports.push(clearImportFromComments(match))
    return ''
  })

  const multiLineRegExp = /^import\s*{(\s*[\w\s,/\n]*\s*)}\s*from\s*['"].+['"].*$/gm
  rawImportsData = rawImportsData.replace(multiLineRegExp, (match) => {
    imports.push(clearImportFromComments(match))
    return ''
  })

  rawImportsData = rawImportsData.replace(/^\n/gm, '')

  return {
    preImportsData: rawImportsData,
    imports,
  }
}
