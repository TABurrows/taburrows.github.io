---
title: "Google Cloud: Dataflow Snapshots"
summary: "An overview of Google Cloud Dataflow Snapshots"
tags: [ "Google Cloud", "Dataflow", "Snapshots" ]
---

Dataflow Snapshots save the state of a streaming pipeline, which lets you start a new version of your Dataflow job without losing state.

Useful for:
- backup and recovery
- testing and rolling back updates

A Snapshot can be created from any running streaming job.  (note. that any new job you create a snapshot using __Streaming Engine__)