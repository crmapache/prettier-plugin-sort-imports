export const extractImportPath = (importString: string): string => {
  const matches = importString.match(/from.+/)

  if (matches !== null) {
    return matches[0].replace(/['"]/gm, '').replace('from', '').trim()
  }

  return importString.replace(/['"]/gm, '').replace('import', '').trim()
}
