---
title: Storage Signed URLs
category: Google Cloud
order: 1
---
Storage Signed URLs

Don't use PII in the Bucket or Object names (they are Global and Unique and are viewable by all)

If you need a lot of buckets, use GUIDs or an equivalent for bucket names, put retry logic in your code to handle name collisions, and keep a list to cross-reference your buckets.

Another option is to use buckets based on domain-name and then manage the bucket object names as sub-domains.

