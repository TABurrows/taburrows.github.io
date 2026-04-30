---
title: "Node.js: REPL"
summary: "Node.js: launching a REPL instance"
tags: [ "Node.js", "REPL" ]
---

How to use the Node.js REPL interactively with Node.js scripts.

## Launch

To launch the Node.js REPL:

`node`

Then `.exit` or Ctrl+c twice.

Once in REPL, you can use the `.load` command to load an external script:

`.load ./script.js`


To execute inline code and drop into interactive mode:

`node -i -e "console.log('This is excuted before dropping in to REPL.')"`

To preload a script.js file before entering REPL, use the require at startup flag `-r`:

`node -i -r ./script.js`

To launch a custom interactive shell from within a script:

```
// script.js
const repl = require('repl');

// Load variables and functions
let message = "Hello World";
function greet(name) {
    return `Hello, ${name}`;
}

// Start REPL and get a reference, set the default prompt indicator:
const r = repl.start({
    prompt: '> ', // Default Prompt
});

// Include the above variables and functions in REPL's context:
r.context.message = message;
r.context.greet = greet;
```

