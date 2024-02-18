# @teages/c2chart

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

<!-- [![bundle][bundle-src]][bundle-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

Parse a C2 chart into a structured and type safe object with useful utilities.

## Usage

Install package:

> `zod` is a peer dependency, you need to install it manually.

```sh
# npm
npm install @teages/c2chart zod

# yarn
yarn add @teages/c2chart zod

# pnpm
pnpm install @teages/c2chart zod

# bun
bun install @teages/c2chart zod
```

Import:

```js
// ESM
import { verifyChart } from '@teages/c2chart'

// CommonJS
const { verifyChart } = require('@teages/c2chart')
```

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@teages/c2chart?style=flat&color=blue
[npm-version-href]: https://npmjs.com/package/@teages/c2chart
[npm-downloads-src]: https://img.shields.io/npm/dm/@teages/c2chart?style=flat&color=blue
[npm-downloads-href]: https://npmjs.com/package/@teages/c2chart

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/Teages/@teages/c2chart/main?style=flat&color=blue
[codecov-href]: https://codecov.io/gh/Teages/@teages/c2chart

[bundle-src]: https://img.shields.io/bundlephobia/minzip/@teages/c2chart?style=flat&color=blue
[bundle-href]: https://bundlephobia.com/result?p=@teages/c2chart -->
