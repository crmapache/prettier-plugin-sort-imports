import { ImportGroups, ImportData } from '../types'

const joinGroup = (items: ImportData[]) => items.map((x) => x.raw.trimEnd()).join('\n')

export const prepareImports = (importGroups: ImportGroups) => {
  const parts: string[] = []

  if (importGroups.libraries.length) parts.push(joinGroup(importGroups.libraries))
  if (importGroups.aliases.length) parts.push(joinGroup(importGroups.aliases))
  if (importGroups.relatives.length) parts.push(joinGroup(importGroups.relatives))
  if (importGroups.directRelatives.length) parts.push(joinGroup(importGroups.directRelatives))

  return parts.join('\n\n')
}