---
title: Networks - MEDs
category: Google Cloud
order: 1
---
Networks - BGP Multi-Exit Descriptors (MED)


When a Cloud Router advertises, Prefixes to a BGP Peer, it includes a priority for each Prefix in the BGP Message/Advertisement. Advertised priority is implemented as a MED.

Base priorities are whole numbers from 0 to 65535, where the highest priority is 0 and the default Base Priority is 100 (used if no Priority is specified)