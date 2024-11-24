---
title: "Web: SSE with Express.js"
summary: "An overview on building a Server-Sent Events Solution with Express.js."
tags: ["Web", "SSE", "Node.js", "Express"]
---


Using Server-Sent Events in an Express.js Application

```js
const express = require("express);
const app = express();
const port = 3000;

app.get('/streaming', (req, res) => {

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client

    let counter = 0;
    let interValID = setInterval(() => {
        counter++;
        if (counter >= 10) {
            clearInterval(interValID);
            res.end(); // terminates SSE session
            return;
        }
        res.write(`data: ${JSON.stringify({num: counter})}\n\n`); // res.write() instead of res.send()
    }, 1000);

    // If client closes connection, stop sending events
    res.on('close', () => {
        console.log('client dropped me');
        clearInterval(interValID);
        res.end();
    });
});

app.listen(port, ()=>{
    console.log(`Started server on ${port}.`);
});
```