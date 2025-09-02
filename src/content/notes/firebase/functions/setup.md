---
title: "Firebase: Setup Firebase Functions"
summary: "Notes on starting the Firebase Function development"
tags: [ "Firebase", "Functions" ]
---



```
myproject
 +- functions/     # Directory containing all your functions code
      |
      +- package.json  # npm package file describing your Cloud Functions code
      |
      +- tsconfig.json
      |
      +- .eslintrc.js # Optional file if you enabled ESLint
      +- tsconfig.dev.json # Optional file that references .eslintrc.js
      |
      +- src/     # Directory containing TypeScript source
      |   |
      |   +- index.ts  # main source file for your Cloud Functions code
      |
      +- lib/
          |
          +- index.js  # Built/transpiled JavaScript code
          |
          +- index.js.map # Source map for debugging
```


