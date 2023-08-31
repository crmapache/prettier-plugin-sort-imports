import { Config } from './types'

const config: Config = {
  libs: [
    {
      name: 'react',
      rule: 'exact',
    },
    {
      name: 'next',
      rule: 'starts',
    },
  ],
  aliases: [],
  getAliasesFromTsConfig: true,
}

try {
  const userConfig: Config = require('../../../sort-plugin.config.js')

  if (userConfig.libs) {
    config.libs = userConfig.libs
  }

  if (userConfig.aliases) {
    config.aliases = userConfig.aliases
  }
} catch (e) {}

export default config
