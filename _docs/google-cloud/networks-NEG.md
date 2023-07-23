---
title: Networks - Network Endpoint Group
category: Google Cloud
order: 1
---
Networks - Network Endpoint Group

A NEG is a Configuration Object that specifies a group of Backend Endpoints or Services.  Each endpoint is specified by an IP Address or Socket.

Backend services define how to handle traffic:
- which health check to use
- session affinity
- how traffic is distributed

You can use NEGsas Backends for some Load Balancers and with Traffic Director

Five types - specified by either and IP Address or a Socket:
- Zonal - can be GCE VMs or services that run on those VMs; points to Cloud Endpoints in the SAME Subnet and Zone
- Internet - a single endpoint that is hosted outside of Google, specified by FQDN:Port or IP:Port
  [ both these above define how endpoints should be reached, where they are located and if they are reachable ]
- Serverless - a Backend that points to a Cloud Run, App Engine, Cloud Functions or API Gateway service
- Private Service Connect - contains a single endpoint that resolves to either a Google-managed regional API Endpoint or a Managed Service published using Private Service Connect
- Hybrid Connectivity - points to Traffic Director services that run outside of Google Cloud; points to Endpoints on-prem or in other Hyperscalers

Common use-case for a NEG: k8s load balancing, the NEG must be able to locate a Pod from the Container