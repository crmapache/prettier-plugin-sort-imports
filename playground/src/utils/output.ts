/**
 * Presentation helpers for what the plugin sends back.
 *
 * Nothing here sorts or regroups anything: the order and the blank lines come
 * from the real plugin running on the server. These functions only split that
 * text into the blocks it already contains, name each block, and colour it.
 */

export interface Token {
  text: string
  color: string
}

export interface OutputGroup {
  label: string
  lines: string[]
}

const NODE_BUILTINS = new Set([
  'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'console',
  'constants', 'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http',
  'http2', 'https', 'inspector', 'module', 'net', 'os', 'path', 'perf_hooks',
  'process', 'punycode', 'querystring', 'readline', 'repl', 'stream',
  'string_decoder', 'timers', 'tls', 'trace_events', 'tty', 'url', 'util',
  'v8', 'vm', 'wasi', 'worker_threads', 'zlib',
])

type Kind = 'side-effect' | 'builtin' | 'alias' | 'relative' | 'scoped' | 'library'

const LABELS: Record<Kind, string> = {
  'side-effect': 'side effects',
  builtin: 'node built-ins',
  library: 'libraries',
  scoped: 'scoped packages',
  alias: 'path aliases',
  relative: 'relative',
}

function sourceOf(statement: string): string {
  const withBindings = statement.match(/from\s+['"]([^'"]+)['"]/)
  if (withBindings) return withBindings[1] ?? ''
  const bare = statement.match(/import\s+['"]([^'"]+)['"]/)
  return bare?.[1] ?? ''
}

function isSideEffect(statement: string): boolean {
  return !/from\s+['"]/.test(statement)
}

function kindOf(statement: string, aliases: string[]): Kind {
  if (isSideEffect(statement)) return 'side-effect'

  const source = sourceOf(statement)
  const head = source.split('/')[0] ?? source

  if (source.startsWith('node:') || NODE_BUILTINS.has(head)) return 'builtin'
  if (aliases.some((alias) => source.startsWith(alias))) return 'alias'
  if (source.startsWith('.')) return 'relative'
  if (source.startsWith('@') && source.includes('/')) return 'scoped'
  return 'library'
}

/**
 * One label for a whole block.
 *
 * A block is never a mix of groups, with one exception: a scoped package whose
 * scope is pinned travels with the libraries, so `@nestjs/swagger` shares a
 * block with `typeorm`. Anything mixed is therefore the library block.
 */
function labelFor(kinds: Set<Kind>): string {
  if (kinds.size === 1) {
    const [only] = kinds
    return LABELS[only as Kind]
  }
  if (kinds.has('builtin')) return LABELS.builtin
  if (kinds.has('alias')) return LABELS.alias
  if (kinds.has('relative')) return LABELS.relative
  return LABELS.library
}

/**
 * Splits the formatted file into its leading import blocks.
 *
 * Continuation lines of a wrapped import stay with the block they belong to, and
 * everything from the first non-import block onwards - the body of the file - is
 * dropped, since this pane is about the imports.
 */
export function splitGroups(formatted: string, aliases: string[]): OutputGroup[] {
  const blocks: string[][] = []
  let current: string[] = []

  for (const line of formatted.split('\n')) {
    if (line.trim() === '') {
      if (current.length > 0) blocks.push(current)
      current = []
      continue
    }
    current.push(line)
  }
  if (current.length > 0) blocks.push(current)

  const groups: OutputGroup[] = []

  for (const block of blocks) {
    if (!/^\s*import\b/.test(block[0] ?? '')) break

    const kinds = new Set<Kind>()
    for (const line of block) {
      if (/^\s*import\b/.test(line)) kinds.add(kindOf(line, aliases))
    }

    groups.push({ label: labelFor(kinds), lines: block })
  }

  return groups
}

const TOKEN_PATTERN =
  /('[^']*'|"[^"]*")|\b(import|from|type|as|export|default|const|function|return)\b|([{}()*,;])/g

export function tokenize(line: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  let match: RegExpExecArray | null

  TOKEN_PATTERN.lastIndex = 0
  while ((match = TOKEN_PATTERN.exec(line)) !== null) {
    if (match.index > last) tokens.push({ text: line.slice(last, match.index), color: '#cfcadb' })
    if (match[1]) tokens.push({ text: match[1], color: '#7fd1b9' })
    else if (match[2]) tokens.push({ text: match[2], color: '#b48cff' })
    else tokens.push({ text: match[3] ?? '', color: '#6f6a82' })
    last = TOKEN_PATTERN.lastIndex
  }

  if (last < line.length) tokens.push({ text: line.slice(last), color: '#cfcadb' })
  if (tokens.length === 0) tokens.push({ text: ' ', color: '#cfcadb' })

  return tokens
}
