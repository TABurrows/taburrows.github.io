---
title: Networks - Dynamic Router - Cloud Router
category: Google Cloud
order: 1
---
Networks - Dynamic Routes & Cloud Router

Dynamic Routes are managed by Cloud Routers 
- Destinations are ALWAYS IP Address Ranges outside the VPC Network
- Dynamism is supplied by BGP, with remote routes received via a BGP Peer Router

BGP Peer Routers are typically outside the Google network (eg. on-prem or with another hyperscaler)

Dynamic Routes are used by:
- Dedicated Interconnects
- Partner Interconnects
- HA VPN Tunnels
- Classic VPN Tunnels

Ruotes are added and removed automatically by Cloud Routers in your VPC Network

The Routes apply to VMs according to the VPC Network's Dynamic Routing Mode
