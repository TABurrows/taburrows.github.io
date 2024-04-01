---
title: Cloud Trace
category: Google Cloud
order: 1
---
Cloud Trace

- Surface Performance Degradations
- Generate Latency reports


Collects LATENCY DATA from App Engine, HTTPs Load Balancers and Applications Instrumented with the Cloud Trace API, it can answer the questions:

- how long does it take my application to handle a given request?
- why is it taking my application so long to handle a request?
- why do some of my requests take longer than others?
- what is the overall latency of requests to my application?
- has latency of my application increased or decreased over time?
- what can I do to reduce application latency?
- what are my application's dependencies?


Language-specific SDKs can analyze projects running on VMs (even those not on Google Cloud):
- Java
- Node.js
- Ruby
- Go

The Trace API can be used to submit and retrieve trace data from any source. In addition a Zipkin connector allows Zipkin tracers to submit data to Cloud Trace.

nb. Traces are automatically captured for projects running on App Engine.


Dashboard:
'Most frequent URIs' and 'Most frequent RPCs' from the previous day are listed, along with the average latency. Open a 'Trace list' window where you can view latency as a function of time, and investigate details of any individual trace.

'Chargeable Trace Spans' pane displays the number of spans ingested in the current calendar month, and the total for the previous month.

After instrumenting you can inspect latency data for a single request and view aggregate latency for an entire application in the Trace console.


Configurations with automatic tracing:
- App Engine Standard: (Java 8, Python 2, and PHP 5 don't need to use the Cloud Trace Client libraries as these Runtimes automatically send latency data to Cloud Trace for requests to application URIs)
- Cloud Functions and Cloud Run: for Incoming and Outgoing HTTP requests, LATENCY DATA is automatically sent to Cloud Trace



nb. OpenTelemetry libraries are simpler to use than the Cloud Trace client libraries because they hide some of the complexity of the corresponding Trace API.
