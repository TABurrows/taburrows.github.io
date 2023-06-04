---
title: Networks - Cloud CDN
category: Google Cloud
order: 1
---
Networks - Cloud CDN

Supports 2 types of Backend: GCE and Cloud Storage buckets

Caching modes control the factors that determine whether and how Cloud CDN caches your content

Three Cache Modes:
- USE_ORIGIN_HEADERS: reguires Origin Responses to set valid Cache Directives and caching Headers
- CACHE_ALL_STATIC: automatically caches static content that doesn't have the no-store, private or no-cache directive
- FORCE_CACHE_ALL: unconditionally caches response, overriding any cache directives set by the origin

URL Map decides which Backend to send the content to.

Used with a HTTP(s) LB and Monitoring and Logging ( indicating a Cache Hit or Cache Miss )

Ingress traffic is free for all regions

Egress charges only apply to data that leaves Compute Engine or Cloud Storage
( reduced rate for allowListed CDN provider )

Create:
- Add Origin
- Give origin a name

To make Storage Bucket Public:
- Clear Enforce public access prevention on this bucket and select Fine-grained
```
gsutil acl ch -u AllUsers:R gs://storage-bucket-name/object.ext
```


CDN Interconnect lets select 3rd party CDN Providers establish Direct Interconnect links at Edge Locations in the Google Network.
- reduces Cloud CDN Cache Population costs
- consider using this for High-Volume CDN egress traffic and/or large file delivery