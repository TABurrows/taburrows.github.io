---
title: Networks - Network Endpoint Group
category: Google Cloud
order: 1
---
Networks - Network Endpoint Group

A NEG is a Configuration Object that specifies a group of Backend Endpoints or Services.  Each endpoint is specified by an IP Address or Socket.

Backend services define hot to handle traffic:
- which health check to use
- session affinity
- how traffic is distributed

You can use NEGsas Backends for some Load Balancers and with Traffic Director

Five types - specified by either and IP Address or a Socket:
- Zonal - can be GCE VMs or services that run on those VMs
- Internet - a single endpoint that is hosted outside of Google, specified by FQDN:Port or IP:Port
  [ both these above define how endpoints should be reached, where they are located and if they are reachable ]
- Serverless - a Backend that points to a Cloud Run, App Engine, Cloud Functions or API Gateway service
- Private Service Connect
- Hybrid Connectivity

Common use-case for a NEG: k8s load balancing, the NEG must be able to locate a Pod from the Container