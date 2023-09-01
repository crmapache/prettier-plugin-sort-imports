import { ImportGroups } from '../types'

export const prepareImports = (importGroups: ImportGroups) => {
  let result = ''

  for (const importData of importGroups.libraries) {
    result += `${importData.raw}\n`
  }

  result += '\n'

  for (const importData of importGroups.aliases) {
    result += `${importData.raw}\n`
  }

  result += '\n'

  for (const importData of importGroups.relatives) {
    result += `${importData.raw}\n`
  }

  if (importGroups.directRelatives.length > 0) {
    result += '\n'

    for (const importData of importGroups.directRelatives) {
      result += `${importData.raw}\n`
    }
  }

  return result
}
