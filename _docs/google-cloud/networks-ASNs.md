---
title: Networks - ASNs
category: Google Cloud
order: 1
---
Autonomous System Numbers


Part of the BGP Protocol - In GCP, Private ASNs are used to communicate between on-prem or Service Provider routers and Cloud Routers

You can use any Private ASN Number, which are the ranges:
- 64 512 - 65 534
- 42 00 000 000 - 42 94 967 294
eg. GCP Cloud Router ASN: 65505, on-prem Peer ASN: 65506 - Cloud Router BGP IP: 169.254.240.185, on-prem Peer BGP IP: 169.254.240.186