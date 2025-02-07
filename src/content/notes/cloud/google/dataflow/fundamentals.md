---
title: "Google Cloud: Dataflow Fundamentals"
summary: "The fundamentals to using Google Cloud Dataflow."
tags: [ "Google Cloud", "Dataflow", "Fundamentals" ]
---

Google Cloud Dataflow is Google Cloud's managed service for Apache Beam.



### Stateful Operations

Include:
- Transforms that produce or consume side inputs
- I/O Reads
- Transforms that use __keyed state__
- Transforms that have window __merging__


### Schemas

Apache Beam allows `PCollection`s to hvae schemas with named fields, in which case explicit Coders are not needed.


## Streaming Engine

Using Streaming Engine you can update the minimum and maximum number of Workers without stopping jobs.