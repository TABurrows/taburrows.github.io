---
title: Rate Limiting
category: APIs
order: 1
---
APIs - Rate Limiting




### Approaches

#### Fixed Window Counter
Track the number of requests a user makes in a fixed arbitrary timespan window
- easy to implement
- arbitrary access decision making
#### Sliding Logs
Log all requests within a moving timespan window and check if the number of requests exceeds the allowed limit
- fairer than Fixed Window Counter
- resource expensive
#### Sliding Window Counter
User’s requests are grouped by timestamp, and rather than by a log of each request, with a counter kept for each group.
- lest resource intensive than Sliding Logs
- only works when the look back window time is not rigid
#### Token Bucket
Keep a counter indicating how many tokens a user has left and a timestamp showing when it was last updated
- offers best use of resources and accuracy
- once the bucket has filled tokens are discarded
#### Leaky Bucket
Fill a fixed length FIFO of the same size as the request limit
- Shapes traffic to reduce server load
- may result in perceived slowness from a user experience perspective



### Example
A simple example that uses the express-rate-limit library
```
// Simple example with the express-rate-limit library
// /index.js
const express = require('express')
const rateLimit = require('express-rate-limit')
const app = express()
const PORT = 3000

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 2, // limit each IP to 2 requests per windowMs
    handler: function (req, res, /*next*/) {
        return res.status(429).json({
          error: 'You sent too many requests. Please wait a while then try again'
        })
    }
})

// Use the limit rule as an application middleware
app.use(apiRequestLimiter)app.get('/', function (req, res) {
  return res.send('Hello World')
})app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})

```