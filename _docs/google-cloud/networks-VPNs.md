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