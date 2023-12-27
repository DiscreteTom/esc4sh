# esc4sh

[![npm](https://img.shields.io/npm/v/esc4sh?style=flat-square)](https://www.npmjs.com/package/esc4sh)
![coverage](https://img.shields.io/codecov/c/github/DiscreteTom/esc4sh?style=flat-square)
![build](https://img.shields.io/github/actions/workflow/status/DiscreteTom/esc4sh/publish.yml?style=flat-square)
![license](https://img.shields.io/github/license/DiscreteTom/esc4sh?style=flat-square)

Escape a string to use it in shell. Support both linux and windows (cmd and powershell).

Try it online in the [playground](https://dttk.discretetom.com/js-playground?crushed=%28%27dependencieG%27https%253A%252F%252Fcdn.jsdelivr.net%252FnpmO%25400.1.2%252FdistO.min.js%27%255D%7EcellGJPrepareClib-*BI%28E4cmdM4psM%2520%29NB*N.*Ftrue%7Eid%21D787179%29%252CJCs-*%257B%255C%27%2524PATH%255C%27%257DBBLole.log%257Bs%257DFfalse%7Eid%21K%29%255D%7EpanelGK%255D%29*esc4sh-%2520%253D%2520B%255Cr%255CnC%27%7Ecode%21%27ID1703684E%2520escF%27%7Ereadonly%21Gs%21%255BILt%2520J%28%27name%21%27KD847765LconsM%252CEN-libO%252F*%2501ONMLKJIGFEDCB-*_).

## Install

```bash
yarn add esc4sh
```

## Usage

Auto detect os and shell (not working in browser):

```ts
import { Manager } from "esc4sh";

const manager = new Manager();
manager.escape("something");

// use Array.map to escape multiple strings
// and join them with space to form an executable command
const cmd = ["curl", ...options.map((o) => manager.escape(o))].join(" ");
```

Explicitly specify shell. These can be used in browser.

```ts
import { esc4sh, esc4cmd, esc4ps, esc } from "esc4sh";

// linux sh/bash
console.log(esc4sh("$PATH")); // => '$PATH'
// windows cmd
console.log(esc4cmd("%PATH$")); // => "%PATH%"
// windows powershell
console.log(esc4ps("$env:PATH")); // => '$env:PATH'

// escape by options
esc(""); // for linux sh/bash
esc("", { windows: true }); // for windows cmd
esc("", { windows: true, powershell: true }); // for windows powershell
```

Helpers (not working in browser).

```ts
import { isWindows, isCmd, isPowershell } from "esc4sh";

isWindows(); // => boolean
isCmd(); // => boolean
isPowershell(); // => boolean
```

## Credit

This project is inspired by [xxorax/node-shell-escape](https://github.com/xxorax/node-shell-escape/) and [boazy/any-shell-escape](https://github.com/boazy/any-shell-escape/).

## [CHANGELOG](./CHANGELOG.md)
