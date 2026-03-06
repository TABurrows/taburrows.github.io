---
title: "Bun: Runtime"
summary: "The Bun runtime - a drop-in replacement for Node.js"
tags: [ "Bun" ]
---

A runtime built around Webkit's javascript engine where Node.js uses Chrome's V8 javascrpt engine.

## Features

Replaces Node.js (3x plus faster than Node.js):
`bun ./index.ts`
- Compatible with Node.js API
- Zero configuration for TypeScript, JSX & React
- Comprehensive builtin standard library
- Hot & Watch mode builtin
- Support for PostgreSQL, Redis, MySQL, SQLite
- Environment variables with .env

Replaces NPM (30x faster):
`bun install`
- Simple npm/pnpm/yarn migration
- Eliminate phantom dependencies
- Workspaces, monorepos
- Lifecycl scripts and postinstall handling
- Block malicious packages
- Dependency autiding with bun audit

Replaces Jest & Vitest for testing:
`bun test`
- Jest-compatible expect() API
- Watch mode & lifecycle hooks
- Snapshot testing
- Concurrent test execution
- DOM APIs via happy-dom
- Built-in code coverage

Replaces Vite and ESBuild for bundling:
`bun build ./app.tsx`
- TypeScript & JSX built-in (no configuration)
- React support out of the box
- Single-file executables
- CSS imports & bundling
- Build for the browser, Bun, and Node.js
- File support for .html, .css, .ts, .tsx, .jsx & more


Builtin Networking tools:
- Fetch
- WebSockets
- TCP
- UDP
- DNS


Builtin Data & Storage tools:
- Cookies
- File I/O
- Streams
- Binary Data
- Archive
- SQL
- SQLite
- S3
- Redis