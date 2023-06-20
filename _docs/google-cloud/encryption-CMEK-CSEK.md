---
title: Encryption - CMEK and CSEK
category: Google Cloud
order: 1
---
Encryption - CMEK and CSEK

At Rest: all data is encrypted

A common cryptographic library is used to implement encryption consistently across almost all Google Cloud products. (eg. Cloud Storage, Compute Engine persistent disks, Cloud SQL DBs, Disk Snapshots, custom Compute Engine VM Images)


1. Data is first encrypted with a unique Data Encryption Key or DEK
2. then broken into Sub-File chunks (which can be up to serveral GBs in size)
3. each chunk is then encrypted at the Storage level with a Unique Key
   (nb. two chunks will not have the same encryption key even if they are part of the same Cloud Storage object)