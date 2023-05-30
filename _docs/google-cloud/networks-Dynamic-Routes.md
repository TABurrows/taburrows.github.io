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

```
Cloud VM [ 10.128.0.2 ] <-> Cloud Router [ Link Local 169.254.10.1 ] <-> Google Peering Edge [ PHY ]  <-> On-Prem Router [ Link Local 169.254.10.2 ] <-> On-Prem VM [ 10.128.0.3 ]

[ Google Peering Edge = Colocation Facility shared Google Network + Internet Access offered by Partner (Partner Interconnect) or Google (Dedicated Interconnect) ]
```

Cloud Router handles the BGP Advertisements and adds/removes the Routes as Custom Routes

Cloud Router creates a BGP Session for the VLAN Attachment and its corresponding on-prem Peer Router, receiving the routes advertised by the on-prem Peer Router and advertising routes for Google Cloud Resources to the remote Peer





