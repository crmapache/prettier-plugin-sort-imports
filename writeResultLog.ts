import path from 'path'
import fs from 'fs'

const writeResultLog = (result: string) => {
  try {
    const baseDir = path.resolve(__dirname, '..')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    let index = 0

    let filename = `${timestamp}.txt`
    let filepath = path.join(baseDir, filename)

    while (fs.existsSync(filepath)) {
      index += 1
      filename = `${timestamp}.${index}.txt`
      filepath = path.join(baseDir, filename)
    }

    fs.writeFileSync(filepath, result, 'utf8')
  } catch {

  }
}