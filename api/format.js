const prettier = require('prettier')
const plugin = require('../dist/index.js')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { code, options = {} } = req.body || {}

  if (typeof code !== 'string') {
    res.status(400).json({ error: 'Missing code' })
    return
  }

  try {
    const formatted = await prettier.format(code, {
      parser: options.parser || 'typescript',
      plugins: [plugin],
      ...options,
    })

    res.json({ code: formatted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
