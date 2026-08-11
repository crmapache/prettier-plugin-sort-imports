import { useCallback, useEffect, useMemo, useState } from 'react'

import { DEMOS, type Demo, type PresetId } from './demos'
import { splitGroups, tokenize, type OutputGroup } from './utils/output'
import './App.css'

type SpecifierOrder = 'length' | 'alphabetical' | 'none'

const SPECIFIER_OPTIONS: Array<{ id: SpecifierOrder; label: string }> = [
  { id: 'length', label: 'Length' },
  { id: 'alphabetical', label: 'A–Z' },
  { id: 'none', label: 'Untouched' },
]

const INSTALL_COMMAND = 'npm i -D prettier-plugin-auto-sort-imports'
const REPO_URL = 'https://github.com/crmapache/prettier-plugin-auto-sort-imports'
const NPM_URL = 'https://www.npmjs.com/package/prettier-plugin-auto-sort-imports'

interface FormatRequest {
  demo: Demo
  separator: boolean
  groupScoped: boolean
  removeUnused: boolean
  specifierOrder: SpecifierOrder
}

/**
 * Formats through the real plugin running on the server.
 *
 * There is deliberately no client-side stand-in: a playground that guesses what
 * the plugin would do is worse than one that admits it cannot reach it.
 */
async function format(code: string, request: FormatRequest): Promise<string> {
  const { demo, separator, groupScoped, removeUnused, specifierOrder } = request

  const res = await fetch('/api/format', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      options: {
        parser: demo.parser,
        filepath: demo.filepath,
        // The demos are written without semicolons and with single quotes, so
        // the only difference between the two panes is the sorting itself.
        semi: false,
        singleQuote: true,
        sortImportsPreset: demo.preset,
        sortImportsAliases: demo.aliases,
        sortImportsSeparator: separator,
        sortImportsGroupScoped: groupScoped,
        sortImportsRemoveUnused: removeUnused,
        sortImportsSpecifierOrder: specifierOrder,
      },
    }),
  })

  const data = await res.json().catch(() => null)
  if (!res.ok || typeof data?.code !== 'string') {
    throw new Error(data?.error ?? `Formatter replied ${res.status}`)
  }

  return data.code
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" className="logo">
      <rect width="32" height="32" rx="8" fill="#863bff" />
      <rect x="8" y="7.4" width="11" height="3.4" rx="1.7" fill="#ffffff" />
      <rect x="8" y="12.8" width="16" height="3.4" rx="1.7" fill="#ffffff" />
      <rect x="8" y="20.6" width="13.5" height="3.4" rx="1.7" fill="#ffffff" />
    </svg>
  )
}

const STEPS = [
  {
    title: 'Zero configuration',
    text: 'Sensible defaults out of the box. No regex arrays, no group syntax to learn.',
  },
  {
    title: 'Finds your aliases',
    text: 'Path aliases come from tsconfig and jsconfig, including workspace packages.',
  },
  {
    title: 'Framework aware',
    text: 'React, Next, Vue, Nuxt, Svelte, Angular, NestJS and Node presets, detected from package.json.',
  },
  {
    title: 'Side effects stay put',
    text: 'Imports with no bindings are never reordered, so polyfills keep their position.',
  },
]

export default function App() {
  const [presetId, setPresetId] = useState<PresetId>('react')
  const [code, setCode] = useState(DEMOS[0]!.code)
  const [groups, setGroups] = useState<OutputGroup[]>([])
  const [error, setError] = useState<string | null>(null)

  const [separator, setSeparator] = useState(true)
  const [groupScoped, setGroupScoped] = useState(true)
  const [removeUnused, setRemoveUnused] = useState(false)
  const [specifierOrder, setSpecifierOrder] = useState<SpecifierOrder>('length')

  const [selectOpen, setSelectOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [installCopied, setInstallCopied] = useState(false)

  const demo = useMemo(() => DEMOS.find((d) => d.id === presetId) ?? DEMOS[0]!, [presetId])

  const pick = useCallback((id: PresetId) => {
    const next = DEMOS.find((d) => d.id === id) ?? DEMOS[0]!
    setPresetId(next.id)
    setCode(next.code)
  }, [])

  // The formatter is a round trip, so edits are debounced rather than sent per
  // keystroke. The latest request wins even if an earlier one answers late.
  useEffect(() => {
    let cancelled = false
    const request: FormatRequest = { demo, separator, groupScoped, removeUnused, specifierOrder }

    const timer = setTimeout(() => {
      if (!code.trim()) {
        setGroups([])
        setError(null)
        return
      }

      format(code, request)
        .then((formatted) => {
          if (cancelled) return
          setGroups(splitGroups(formatted, demo.aliases))
          setError(null)
        })
        .catch((err: unknown) => {
          if (cancelled) return
          setGroups([])
          setError(err instanceof Error ? err.message : String(err))
        })
    }, 160)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [code, demo, separator, groupScoped, removeUnused, specifierOrder])

  useEffect(() => {
    if (!selectOpen) return
    const close = () => setSelectOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [selectOpen])

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Tab') return
    event.preventDefault()

    const element = event.currentTarget
    const { selectionStart, selectionEnd } = element
    setCode(code.slice(0, selectionStart) + '  ' + code.slice(selectionEnd))

    requestAnimationFrame(() => {
      element.selectionStart = element.selectionEnd = selectionStart + 2
    })
  }

  const copyOutput = () => {
    const text = groups.map((group) => group.lines.join('\n')).join(separator ? '\n\n' : '\n')
    void navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const copyInstall = () => {
    void navigator.clipboard.writeText(INSTALL_COMMAND)
    setInstallCopied(true)
    setTimeout(() => setInstallCopied(false), 1600)
  }

  const importCount = (code.match(/^\s*import\s/gm) ?? []).length
  const specifierLabel =
    SPECIFIER_OPTIONS.find((option) => option.id === specifierOrder)?.label ?? 'Length'

  const toggles = [
    { id: 'separator', label: 'Blank line between groups', on: separator, set: setSeparator },
    { id: 'groupScoped', label: 'Split @scoped packages', on: groupScoped, set: setGroupScoped },
    { id: 'removeUnused', label: 'Remove unused', on: removeUnused, set: setRemoveUnused },
  ] as const

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <Logo />
            <span className="brand-name">auto-sort-imports</span>
          </div>
          <nav className="header-nav">
            <a className="chip mono" href={NPM_URL} target="_blank" rel="noopener noreferrer">
              npm 2.0.0
            </a>
            <a className="chip" href={REPO_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">Prettier plugin · zero config</div>
        <h1 className="hero-title">
          prettier-plugin-<span>auto-sort-imports</span>
        </h1>
        <p className="hero-text">
          Sorts and groups imports, with a blank line between groups. Reads your tsconfig path
          aliases on its own — no regex arrays to maintain.
        </p>
        <button type="button" className="install" onClick={copyInstall}>
          <span className="install-prompt">$</span>
          <span>{INSTALL_COMMAND}</span>
          <span className={`install-hint${installCopied ? ' is-copied' : ''}`}>
            {installCopied ? 'copied' : 'copy'}
          </span>
        </button>
      </section>

      <section className="presets">
        {DEMOS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`preset${entry.id === presetId ? ' is-active' : ''}`}
            onClick={() => pick(entry.id)}
          >
            {entry.label}
          </button>
        ))}
      </section>

      <section className="board-wrap">
        <div className="board">
          <div className="toolbar">
            {toggles.map((toggle) => (
              <div
                key={toggle.id}
                className={`toggle${toggle.on ? ' is-on' : ''}`}
                onClick={() => toggle.set(!toggle.on)}
              >
                <span className="track">
                  <span className="knob" />
                </span>
                <span className="toggle-label">{toggle.label}</span>
              </div>
            ))}

            <div className="specifiers">
              <span className="specifiers-label">Specifiers</span>
              <div className="select-wrap">
                <div
                  className={`select${selectOpen ? ' is-open' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectOpen(!selectOpen)
                  }}
                >
                  <span>{specifierLabel}</span>
                  <span className="caret" />
                </div>
                {selectOpen && (
                  <div className="options">
                    {SPECIFIER_OPTIONS.map((option) => (
                      <div
                        key={option.id}
                        className={`option${option.id === specifierOrder ? ' is-active' : ''}`}
                        onClick={() => {
                          setSpecifierOrder(option.id)
                          setSelectOpen(false)
                        }}
                      >
                        <span>{option.label}</span>
                        <span className="dot" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="toolbar-spacer" />

            <button type="button" className="ghost-btn" onClick={() => setCode(demo.code)}>
              Reset
            </button>
          </div>

          <div className="panes">
            <div className="pane-col">
              <div className="pane-bar">
                <span className="pane-path mono">{demo.filepath.replace('/playground/', '')}</span>
                <span className="pane-count mono">{importCount} imports</span>
              </div>
              <textarea
                className="editor pane"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                placeholder="Paste TypeScript or JavaScript here…"
              />
            </div>

            <div className="pane-col is-output">
              <div className="pane-bar">
                <span className="pane-status mono">
                  <span className="status-dot" />
                  <span>sorted · {groups.length} groups</span>
                </span>
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={copyOutput}
                  disabled={groups.length === 0}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="output pane">
                {groups.map((group, index) => (
                  <div
                    key={`${group.label}-${index}`}
                    className="group"
                    style={{ marginBottom: separator ? 22 : 0 }}
                  >
                    {separator && (
                      <div className="group-head">
                        <span>{group.label}</span>
                        <span className="rule" />
                      </div>
                    )}
                    {group.lines.map((line, lineIndex) => (
                      <div key={lineIndex} className="code-line">
                        {tokenize(line).map((token, tokenIndex) => (
                          <span key={tokenIndex} style={{ color: token.color }}>
                            {token.text}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}

                {error && (
                  <div className="placeholder is-error">
                    <strong>The formatter is unreachable.</strong>
                    <span>{error}</span>
                    <span className="placeholder-note">
                      This playground runs the published plugin server-side and never guesses its
                      output.
                    </span>
                  </div>
                )}

                {!error && groups.length === 0 && (
                  <div className="placeholder">Nothing to sort yet.</div>
                )}
              </div>
            </div>
          </div>

          <div className="board-foot">
            <span className="foot-preset">{demo.label} preset —</span>
            <span className="foot-description">{demo.description}</span>
            {demo.tags.map((tag) => (
              <span key={tag} className="tag mono">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="config">
        <div>
          <h2 className="config-title">Two lines in .prettierrc, then forget about it</h2>
          <div className="steps">
            {STEPS.map((step, index) => (
              <div key={step.title} className="step">
                <span className="step-number mono">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-text">{step.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="config-card">
          <div className="config-card-bar mono">.prettierrc.json</div>
          <pre className="config-code">
            {'{\n  '}
            <span className="str">"plugins"</span>
            {': ['}
            <span className="str">"prettier-plugin-auto-sort-imports"</span>
            {'],\n  '}
            <span className="str">"sortImportsPreset"</span>
            {': '}
            <span className="str">"auto"</span>
            {',\n  '}
            <span className="str">"sortImportsSeparator"</span>
            {': '}
            <span className="bool">true</span>
            {',\n  '}
            <span className="str">"sortImportsGroupScoped"</span>
            {': '}
            <span className="bool">true</span>
            {',\n  '}
            <span className="str">"sortImportsSpecifierOrder"</span>
            {': '}
            <span className="str">"length"</span>
            {',\n  '}
            <span className="str">"sortImportsRemoveUnused"</span>
            {': '}
            <span className="bool">false</span>
            {'\n}'}
          </pre>
        </div>
      </section>

      <footer className="site-footer">
        <span className="mono">MIT · prettier-plugin-auto-sort-imports</span>
        <span className="footer-links">
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={NPM_URL} target="_blank" rel="noopener noreferrer">
            npm
          </a>
          <a href="https://prettier.io" target="_blank" rel="noopener noreferrer">
            Prettier
          </a>
        </span>
      </footer>
    </div>
  )
}
