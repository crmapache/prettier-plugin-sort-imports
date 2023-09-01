export const commonExtractor = (code: string) => {
  const regExp = /^[\s\S]+import[\s\S]+?['"`].+/gm

  const match = code.match(regExp)

  return {
    rawImports: match && match[0],
    codeWithoutImports: code.replace(regExp, ''),
  }
}
