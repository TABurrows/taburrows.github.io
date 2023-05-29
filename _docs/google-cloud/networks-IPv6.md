---
title: Networks - IPv6
category: Google Cloud
order: 1
---
Networks - IPv6

VPC Networks support IPv6 Addresses with Subnets support IPv6 on an individual basis

Single-stack Subnets are IPv4

Dual-stack Subnets are IPv4 and IPv6 (no Subnet type supports only IPv6)

IPv6 Addresses can be assigned to Objects and Resources in a Subnet that supports IPv6 (must be Dual-stack)

Internal IPv6 Addresses are used for VM to VM communication within VPC Networks.  They use Unique Local Addresses (ULAs) which can only be routed WITHIN VPC Networks and cannot be routed to the internet.

External IPv6 Addresses can be used for comms between VMs within VPC Networks using Global Unicast Addresses (GUAs) which are Internet routable.

Connected VMs inherit the IPv6 Access Type from the Subnet

To enable Internal IPv6 on a Subnet you must first assign an Internal IPv6 range on the VPC Network

A /48 Unique Local Address from within fd20::/20 is assigned to the VPC Network

Any Interface can have IPv6 Addresses

Assigning IPv6 Address Ranges to a Subnet:
- When you enbal IPv6 on a VM, the VM is assigned a /96 range from the subnet
- the first IP Address in that range is assigned to the Primary Interface
- You don't configure whether a VM gets Internal ULAs or External GLAs - the VM inherits from the Subnet


Dual-stack not supported on Auto-mode VPC networks and Legacy Networks - convert them to Custom-mode