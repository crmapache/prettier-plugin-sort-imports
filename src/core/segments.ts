import type { ParsedImport } from '../types'

/**
 * A run of imports that is either sorted as a whole or left exactly as it came in.
 */
export interface ImportSegment {
  /** True for a run of side-effect imports, which are never moved. */
  anchored: boolean
  imports: ParsedImport[]
}

/**
 * Splits the import block on its side-effect imports.
 *
 * `import './styles.css'`, `import 'reflect-metadata'` and `import './setup/dayjs'`
 * exist only to run code, so where they sit is part of how the program behaves:
 * a stylesheet's position decides which rules win, and a setup module has to run
 * before whatever depends on it. Neither is decidable from the import itself, so
 * they stay put and act as boundaries; only the runs between them are sorted.
 */
export function splitOnSideEffects(imports: ParsedImport[]): ImportSegment[] {
  const segments: ImportSegment[] = []

  for (const entry of imports) {
    const anchored = entry.isSideEffect
    const last = segments[segments.length - 1]
    if (last && last.anchored === anchored) last.imports.push(entry)
    else segments.push({ anchored, imports: [entry] })
  }

  return segments
}
