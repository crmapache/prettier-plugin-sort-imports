# Playground

Interactive demo for `prettier-plugin-auto-sort-imports`, deployed at
[prettier-plugin-sort-imports.vercel.app](https://prettier-plugin-sort-imports.vercel.app).

Vite + React for the page, and the real plugin for the sorting: every keystroke is
formatted by `api/format.js` in the repository root, which runs prettier with the
plugin built from `../dist`. There is no client-side approximation on purpose — a
playground that guesses would eventually disagree with the package it advertises.
When the API cannot be reached, the output pane says so instead of inventing a
result.

## Running it locally

Two processes, because the formatter lives on the server:

```shell
# from the repository root - build the plugin the API loads
npm run build

# then serve both halves together
npx vercel dev
```

`vercel dev` runs this app and `api/format.js` on one origin. Without the Vercel
CLI, start Vite on its own and point it at any local server exposing the same
endpoint:

```shell
npm run dev            # in playground/, proxies /api to $API_URL (default :3000)
```

## Layout

- `src/demos.ts` — one entry per framework preset: the sample file, its fake
  path, the aliases it relies on, and the copy shown under the editor.
- `src/utils/output.ts` — splits the formatted text into the blocks the plugin
  already produced, names each block, and colours the tokens. It never reorders.
- `src/App.tsx` — the page and the options that are sent to the plugin.
