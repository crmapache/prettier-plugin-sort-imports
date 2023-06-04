import { Config } from '../types'

export const commonExtractor: Config['extractor'] = (code: string) => {
  return code.match(/^import[\s\S]+?['"`].+/gm)
}
