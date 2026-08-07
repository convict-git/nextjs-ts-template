# React TypeScript Webpack Template

A minimal React sandbox template powered by **Next.js**, **TypeScript**, **SWC**, and **webpack**. Tooling includes ESLint, Prettier, Husky, and lint-staged. Tests use **React Testing Library** with Jest.

## Features

- **Yarn** package manager
- **TypeScript 5.9** with strict `tsconfig.json` (latest stable with full ESLint/tooling support)
- **Next.js 16** with SWC compiler and explicit **webpack** bundler (`--webpack` flag)
- **ESLint** + **Prettier** with pre-commit hooks via **Husky** and **lint-staged**
- **Jest** + **React Testing Library** for component tests
- Path alias: `@/*` → `src/*`

## Use as a template

Copy this repository into a new project with [degit](https://github.com/Rich-Harris/degit) (no git history):

```bash
npx degit convict/open-source/nextjs-ts-template my-react-sandbox
cd my-react-sandbox
yarn install
yarn prepare
```

Replace `convict/open-source/nextjs-ts-template` with your GitHub org/repo once published, e.g. `your-org/nextjs-ts-template`.

## Getting started

```bash
yarn install
yarn prepare   # sets up Husky git hooks
yarn dev       # start dev server (webpack + SWC)
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `yarn dev`           | Start development server (webpack) |
| `yarn build`         | Production build (webpack)         |
| `yarn start`         | Start production server            |
| `yarn lint`          | Run ESLint                         |
| `yarn lint:fix`      | Run ESLint with auto-fix           |
| `yarn format`        | Format files with Prettier         |
| `yarn format:check`  | Check formatting with Prettier     |
| `yarn test`          | Run tests once                     |
| `yarn test:watch`    | Run tests in watch mode            |
| `yarn test:coverage` | Run tests with coverage report     |

## Project structure

```
src/
  pages/            # Next.js Pages Router (_app, _document, _error, routes)
  styles/           # Global styles
  components/       # React components
    __tests__/      # Component tests (React Testing Library)
```

## Webpack configuration

Next.js 16 defaults to Turbopack. This template opts into webpack explicitly:

- `package.json` scripts use `next dev --webpack` and `next build --webpack`
- Extend bundling in `next.config.ts` via the `webpack` callback

SWC remains the default compiler for transforms and minification.

## License

MIT
