---
title: SLIs
category: SRE
order: 1
---
Service Level Indicators

Selected by understanding what users want from a system.

Service Categories:

- User-facing serving systems (availability, latency, throughput)
- Storage systems (latency, availability, durability)
- Big Data systems (throughput, end-to-end latency)

Correctness: were the right answers returned? the right data retrieved? the right analysis done? 

Correctness: import to track as an indicator of system health even though it's a property of the data in the system rather than the infrastructure per se, and so usually not an SRE responsibility to meet.

Aggregation: approach with care (indicators can be missed if done badly)

percentiles are used for indicators as they offer a distribution shape for differing attributes

50th percentile: Median

End users prefer a slight slower system with consistent performance characteristics than one that has variance in its responses - SREs tend to concentrate on the top 99.9th percentile
