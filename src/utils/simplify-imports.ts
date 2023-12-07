import { UserAlias } from '../types'
import { extractImportPath } from './extract-import-path'

export const simplifyImports = (imports: string[], userAliases: UserAlias[], filepath: string) => {
  const result = []
  const rootFolderPath = process.cwd()
  const targetFileFolderPath = `${rootFolderPath}/${filepath.replace(/\/([^/]+)$/, '')}`

  for (const rawImport of imports) {
    const importPath = extractImportPath(rawImport).replace(/;$/, '')

    if (importPath.startsWith('@')) {
      const clearedPath = importPath.replace(/^@|\/.+$/g, '')
      const userAliase = userAliases.find((userAliase) => userAliase.name === clearedPath)

      if (userAliase) {
        let preparedPath = userAliase.path

        if (importPath.match(/^@.+?\//)) {
          preparedPath = importPath.replace(/^@.+?\//, `${userAliase.path}/`)
        }

        const path = `${rootFolderPath}/src/${preparedPath}`

        if (path.includes(targetFileFolderPath)) {
          result.push(rawImport.replace(importPath, path.replace(targetFileFolderPath, '.')))
          continue
        }
      }
    }

    result.push(rawImport)
  }

  return result
}
