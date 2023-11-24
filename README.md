# esc4sh

[![npm](https://img.shields.io/npm/v/esc4sh?style=flat-square)](https://www.npmjs.com/package/esc4sh)
![coverage](https://img.shields.io/codecov/c/github/DiscreteTom/esc4sh?style=flat-square)
![build](https://img.shields.io/github/actions/workflow/status/DiscreteTom/esc4sh/publish.yml?style=flat-square)
![license](https://img.shields.io/github/license/DiscreteTom/esc4sh?style=flat-square)

Escape a string to use it in shell. Support both linux and windows (cmd and powershell).

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
esc("something", {
  isWindows: true,
  isCmd: true,
  isPowershell: false,
});
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
