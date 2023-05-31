---
title: Networks - VPC
category: Google Cloud
order: 1
---
Networks - Virtual Private Clouds

VPC Networks are isolated private networking domains by default

VM Instances within a VPC Network can communicate between themselves with the Private Internal IP Address ranges (as long as Firewall Rules allow)

No Private Internal IP Address traffic is allowed BETWEEN VPC Networks (unless you setup VPC Peering or attach a VPN)

Every VM Instance in a VPC Network has a default NIC ( vNIC )

To attach a VM Instance to Multiple VPC Networks, add additional NICs.

A NIC can only be attached to one VPC Network at a time and will have an Internal IP Address with an optional External IP Address
- You can only create a NIC when you create a VM Instance
- Each NIC on a VM Instance MUST be attached to a DIFFERENT VPC Network
- Each NIC must belong to a Subnet whose IP Range does not overlap with the Subnets of any other NICs
- The Additional VPC Networks MUST EXIST before creation of the Multi-NIC VM Instance
- You cannot delete a NIC withou deleting the Instance
- an Internal DNS query will resolve to the Primary NIC on the VM Instance ( nic0 )
  - if the DNS query originates from a different VPC Network than the VPC Network nic0 is attached to, then that query will fail


Max vNICs: 8
VMs with <=2 vCPUs, Max vNICs: 2