import { builtinModules } from 'module'

import type { ImportGroupId, ParsedImport, ResolvedOptions } from '../types'

const BUILTINS = new Set(builtinModules)

/** `@scope/pkg/deep/path` -> `@scope/pkg`, `lodash/debounce` -> `lodash`. */
export function packageName(source: string): string {
  const parts = source.split('/')
  if (source.startsWith('@')) return parts.slice(0, 2).join('/')
  return parts[0] ?? source
}

/**
 * Position in the priority list, or the list length when absent.
 *
 * Whole-name matching only. Substring matching used to promote `preact`,
 * `next-auth` and `@testing-library/react` alongside the real thing.
 */
export function priorityRank(source: string, priorityPackages: string[]): number {
  const name = packageName(source)
  for (let i = 0; i < priorityPackages.length; i++) {
    const entry = priorityPackages[i]
    if (!entry) continue
    if (source === entry || name === entry || source.startsWith(`${entry}/`)) return i
  }
  return priorityPackages.length
}

function isRelative(source: string): boolean {
  return source.startsWith('.')
}

function matchesAlias(source: string, aliases: string[]): boolean {
  return aliases.some((alias) =>
    alias.endsWith('/') ? source.startsWith(alias) : source === alias || source.startsWith(`${alias}/`),
  )
}

function isBuiltin(source: string): boolean {
  return BUILTINS.has(source) || BUILTINS.has(packageName(source))
}

/** `@scope/pkg` -> `@scope`; null when the package is unscoped. */
function scopeOf(source: string): string | null {
  if (!source.startsWith('@')) return null
  const slash = source.indexOf('/')
  return slash > 0 ? source.slice(0, slash) : null
}

/**
 * True when some package of the same scope is pinned.
 *
 * A scope is one family: pinning `@nestjs/common` while letting `@nestjs/swagger`
 * fall into the scoped group split `@nestjs` across two blocks, so a controller
 * ended up with a single import, a blank line, and one more import from the same
 * scope. The whole family follows whichever group its pinned members are in.
 */
function hasPinnedScope(source: string, priorityPackages: string[]): boolean {
  const scope = scopeOf(source)
  if (!scope) return false
  return priorityPackages.some((entry) => entry === scope || entry.startsWith(`${scope}/`))
}

/**
 * Picks the bucket for a single import.
 *
 * Side-effect imports never reach here: they keep their position instead of
 * being grouped, which is what `core/segments` is for.
 *
 * Aliases win over builtins because a project may legitimately alias a name that
 * collides with a node module; `node:` prefixed specifiers can never be aliases
 * and are decided first.
 */
export function classify(entry: ParsedImport, options: ResolvedOptions): ImportGroupId {
  const { source } = entry
  const alias = matchesAlias(source, options.aliases)

  if (source.startsWith('node:')) return 'builtin'
  if (alias) return 'alias'
  if (isRelative(source)) return 'relative'
  if (isBuiltin(source)) return 'builtin'
  // Workspace packages are usually scoped too, so they have to be claimed first.
  if (options.workspacePackages.has(packageName(source))) return 'workspace'

  // A pinned package stays with the libraries even when scoped, otherwise the
  // scoped group would swallow `@nestjs/common` and `@angular/core` and undo
  // the very ordering the preset exists to provide. Its scope siblings come
  // along, so one family is never split across two blocks.
  const isPinned = priorityRank(source, options.priorityPackages) < options.priorityPackages.length
  if (
    options.groupScoped &&
    !isPinned &&
    !hasPinnedScope(source, options.priorityPackages) &&
    source.startsWith('@') &&
    source.includes('/')
  ) {
    return 'scoped'
  }

  return 'library'
}

export function groupImports(
  imports: ParsedImport[],
  options: ResolvedOptions,
): Map<ImportGroupId, ParsedImport[]> {
  const groups = new Map<ImportGroupId, ParsedImport[]>()
  for (const entry of imports) {
    const id = classify(entry, options)
    const bucket = groups.get(id)
    if (bucket) bucket.push(entry)
    else groups.set(id, [entry])
  }
  return groups
}
