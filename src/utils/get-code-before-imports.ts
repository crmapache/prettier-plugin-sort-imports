export const getCodeBeforeImports = (code: string) => {
  const result = code.match(/^[\s\S]+?import/m)

  if (result && result[0]) {
    return result[0].replace(/import([\s\S]+)?/, '')
  }

  return ''
}
