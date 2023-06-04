export const replaceImports = (imports: string, code: string) => {
  const codeWithoutImports = code.replace(/^import[\s\S]+?['"`].+/gm, '')
  return `${imports}\n${codeWithoutImports}`
}
