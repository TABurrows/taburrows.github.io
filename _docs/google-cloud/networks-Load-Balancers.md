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

Used as a routing next hop

Fastest of the Load Balancers with the most minimal of processing

Routes connections directly from Client to the healthy Backend without interruption (no intermediary device or single point of failure)

Client reqs to the LB IP Address go directly to the healthy Backend VMs

Responses from healthy Backends go DIRECTLY to Clients (not back through the LB)

TCP Response use Direct Server Return

Use-cases:
- Load Balance traffic across multiple VMs that are functioning as Gateway or Router VMs
- You can use Gateway Virtual Appliances as the next hop for a default route (eg VM instances send traffic TO the internet through a set of Load Balanced Virtual Gateway VMs)
- You can sent traffic through multiple LBs in 2 or more directions by using the same set of multi-NIC gateway or router VMs as Backends
  ( eg. create a LB and use it as a Next Hop for a Custom Static Router in each VPC network )


Each Internal TCP/UDP Load Balancer operates within a Single VPC Network, distributin traffic to Backend VM NICs in that network

Backend Services are typically Gateway VMs, Gateway Virtual Appliances, multi-NIC Gateways and Router VMs (all Internal resources)

Custom Static Routes are included in VPC Network Peering sharing (unlike the Default Static Route to the Internet)

Client VMs send packets to the LB BEs through VPC Net Routing, in a bump-in-the-wire fashion

A Hub-and-Spoke Topology can be configured with your next-hop firewall virtual appliances located in the hub VPC Network by doing the following:
- In the Hub VPC Network, create an Internal TCP/UDP Load Balancer with the Firewall Virtual Appliances as the Backends.
- In the Hub VPC Network, create a Custom Static Route 
- and set the Next Hop to be the Internal TCP/UDP Load Balancer
- then use VPC Network Peeing to connect the Hub VPC Network to each of the spoke VPC Networks
- For each peering, configure the hub network to export its custom routes
- configure the corresponding Spoke Network to import Custom Routes ( the route with the Load Balancer Next Hop is one of the routes that the Hub Network Exports )
Subject to the routing order, the next hop firewall appliance load balancer in the hub VPC Network is available in the spoke networks.
(If global access is enabled, the firewall appliance is availalbe according to the routing order. If global access is disabled, then resources are only available to requestors in the same region)

Caveats:
- Enable GLOBAL ACCESS on the VPC Network so that the next Hop is usable from All Regions
- Even if ALL health checks fail, the LB Next Hop is still in effect
- The LB must use an IP Address that is unique to a LB Forwarding Rule
- Two or More Custom Static Route next hops with the SAME destination that use different LBs are never distributed by using ECMP
- To route idential source IP Addresses to the same backend, use the Client IP, No Destination (CLIENT_IP_NO_DESTINATION) session affinity option
- network tags
  
Highest priority
