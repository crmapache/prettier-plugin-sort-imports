import { ImportGroups } from '../types'

export const prepareCode = (importGroups: ImportGroups) => {
  let result = ''
  console.log('importGroups.libraries >>', importGroups.libraries)
  for (const importData of importGroups.libraries) {
    result += `${importData.raw}\n`
  }

  result += '\n'
  console.log('importGroups.aliases >>', importGroups.aliases)
  for (const importData of importGroups.aliases) {
    result += `${importData.raw}\n`
  }

  result += '\n'
  console.log('importGroups.relatives >>', importGroups.relatives)
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
