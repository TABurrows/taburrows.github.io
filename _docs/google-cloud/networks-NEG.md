---
title: Networks - Network Endpoint Group
category: Google Cloud
order: 1
---
Networks - Network Endpoint Group

A NEG is a Configuration Object that specifies a group of Backend Endpoints or Services.  

Backend services define hot to handle traffic:
- which health check to use
- session affinity
- how traffic is distributed

Five types - specified by either and IP Address or a Socket:
- Zonal
- Internet
- Serverless
- Private Service Connect
- Hybrid Connectivity

Common use-case for a NEG: k8s load balancing, the NEG must be able to locate a Pod from the Container