export const commonExtractor = (code: string) => {
  const regExpCheck = /^(?!\/\/|\/\*).*import[\s\S]+?['"`].+/gm
  const regExpSelect = /^[\s\S]+import[\s\S]+?['"`].+/gm

  let match = null
  let codeWithoutImports = code

  if (regExpCheck.test(code)) {
    match = code.match(regExpSelect)
    codeWithoutImports = code.replace(regExpSelect, '')
  }

  return {
    rawImports: match && match[0],
    codeWithoutImports,
  }
}
