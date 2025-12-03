const stripLeadingEmptyLines = (s: string) => s.replace(/^(?:[ \t]*\n)+/, '')

export const prepareFinalCode = (
  preImportsData: string,
  preparedImports: string,
  codeWithoutImports: string,
) => {
  const pre = preImportsData.trimEnd()
  const imports = preparedImports.trimEnd()
  const rest = stripLeadingEmptyLines(codeWithoutImports)

  let out = ''

  if (pre) out += pre + '\n'
  out += imports

  if (rest) out += '\n\n' + rest

  return out
}