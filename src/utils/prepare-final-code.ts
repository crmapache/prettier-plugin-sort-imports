export const prepareFinalCode = (
  preImportsData: string,
  preparedImports: string,
  codeWithoutImports: string,
) => {
  return `${preImportsData}\n${preparedImports}\n${codeWithoutImports}`
}
