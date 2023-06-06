---
title: Networks - VPNs
category: Google Cloud
order: 1
---
Networks - Cloud VPN


Securely connects your Peer Network to your Virtual Private cloud (VPC) network through IPsec tunnels

Two VPN Gateways are created, one at each end of the VPN tunnel.  Traffic encrypted at one Gateway is decrypted at the other.

Cheaper and slower than Interconnects - good for low-volume, low-bandwidth data connections

Classic and HA VPN are both available still

For BGP Routing, you must use HA VPN

With Cloud VPN, you can selectively advertise Routes between VPC Networks. (compared to when you set up VPC Network Peering when All the Subnet Routes are advertised)


VPN:
- data encrypted in transit
- 1.5Gbps - 3Gbps per tunnel
- access with Internal IP Addresses


HA VPN:
Supports site-to-site VPN for different configuration topologies:
- An HA VPN Gateway to peer VPN Devices 
- An HA VPN Gateway to an AWS Virtual Private Gateway
- Two HA VPN Gateways connected to each other

HA VPN has 3 typical peer gateway configurations:
- HA Gateway to two separate peer VPN devices, each with its own IP Addresses
- One Peer VPN Device that uses two separate IP Addresses
- One Peer VPN Device that uses one IP Address

If your Peer-side Gateway is HW-based having a 2nd Peer-side Gateway provides redundancy and failover on the Peer-side of the Connection ( REDUNDANCY_TYPE takes the value TWO_IPS_REDUNDANCY )

When configuring an HA VPN External VPN Gateway to AWS, you can use either a TRANSIT GATEWAY or a VIRTUAL PRIVATE GATEWAY. Only the Transit Gateway supports ECMP (Equal-cost Multipath) routing. When enabled, ECMP distributes traffic equally across Active Tunnels. In this topology, you configure three major Gateway components:
- an HA VPN Gateway in GCP with two Network Interfaces
- Two AWS Virtual Private Gateways that connect to your GCP HA VPN Gateway
- an External VPN Gateway resource in GCP that represents you AWS Virtual Private Gateway (this resource provides info to GCP about your AWS Gateway) 