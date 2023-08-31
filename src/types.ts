export type Import = string

export type ImportData = {
  raw: string
  path: string
}

export type ImportGroup = 'libraries' | 'aliases' | 'relatives' | 'directRelatives'

export type ImportGroups = Record<ImportGroup, ImportData[]>

export type LibraryRuleName = 'exact' | 'starts' | 'includes'

export enum LibraryRule {
  'EXACT' = 'exact',
  'STARTS' = 'starts',
  'INCLUDES' = 'includes',
}

export type LibraryConfig = {
  name: string
  rule: LibraryRuleName
}

export type Config = {
  libs?: LibraryConfig[]
  aliases?: string[]
  getAliasesFromTsConfig?: boolean
}
