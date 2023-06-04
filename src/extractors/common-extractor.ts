export const commonExtractor = (code: string) => {
  return code.match(/^import[\s\S]+?['"`].+/gm)
}
