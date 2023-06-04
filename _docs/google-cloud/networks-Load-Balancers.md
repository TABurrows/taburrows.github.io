---
title: Networks - Load Balancing
category: Google Cloud
order: 1
---
Networks - Load Balancing

Load Balancers can serve source traffic from outside of GCP as well as internal GCP resources

Cloud Load Balancing offers Backend Services in addition to traffic management, including:
- health checks
- session affinity
- balancing mode
- capacity scaling

Google Cloud Armor policies are applied to the Load Balancer:
Either Security Policy is:
- deny, then allow
  or allow then deny

First matching stops further processing

Priority levels 1...


GLOBAL Load Balancers - HTTP(s), SSL Proxy and TCP Proxy

GLOBAL Load



HYBRID Load Balancing
Balancing of traffic between GCP and on-prem or other Hyperscalers
- allows for the adaption of changing market demands and incrementall modernize the backend services that run your workloads
- can be used to enable the migration to a modern Cloud-based solution or a permanent fixture of your Org infrastructure (Cloud Interconnect or VPN for comms)

To configure Hybrid LB, configure Backend Services outside of Google Cloud: first configure one or more Hybrid connectivity NEGs. Then add each non-GCP network endpoint IP:Port combination to a hybrid connectivity NEG. Ensure that the IP:Port/Socket is reachable from the GCP Tenancy.  Set the network endpoint type to NON_GCP_PRIVATE_IP_PORT. Create the NEG in GCP Zone that is as CLOSE as possible to your other environment. Then add Hybrid NEG to a Hybrid LB Backend. (traffic may be dropped if the Hybrid NEG contains internal or Google endpoints, only external should be in the config)

Supported LBs:
- Global External HTTP(s)
- Global External HTTP(s) Classic
- Regional External HTTP(s)
- Internal HTTP(s)
- External TCP Proxy
- External SSL Proxy
- Regional Proxy

To Create, Delete or Manage mixed Zonal and Hybrid Connectivity NEGs backends in a single Backend Service, you must use gcloud or the REST API

nb. Regional Dynamic Routing and Static Routes are not supported; the Cloud Router used for Hybrid connectivity must be enabled with GLOBAL DYNAMIC ROUTING. Internal HTTP(s) Load Balancing must be configured in the same region (if in different regions, you may see Backends as healthy, but client reqs will not be forwarded to the Backend)

nb. HA Cloud VPN connections are currently encrypted by default, Cloud Interconnect connections are not encrypted by default.



INTERNAL Load Balancers