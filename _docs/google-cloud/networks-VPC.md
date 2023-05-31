---
title: Networks - VPC
category: Google Cloud
order: 1
---
Networks - Virtual Private Clouds

VPC Networks are isolated private networking domains by default

- VPC Networks are Global Resources
- Subnets are Regional Resources

There are two types of VPC Network Subnet creation modes [ 'SUBNET_MODE: AUTO' | 'SUBNET_MODE: CUSTOM' ]: Auto-mode & Custom-mode ( Default: Auto-mode and this is created in the 'default' VPC Network )

VM Instances within a VPC Network can communicate between themselves with the Private Internal IP Address ranges (as long as Firewall Rules allow)

VPC networks have an internal DNS service that allows you to address instances by their DNS names instead of their internal IP addresses. When an internal DNS query is made with the instance hostname, it resolves to the primary interface (nic0) of the instance.

No Private Internal IP Address traffic is allowed BETWEEN VPC Networks (unless you setup VPC Peering or attach a VPN)
No internal IP address communication is allowed between networks, unless you set up mechanisms such as VPC peering or VPN

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
VMs with >2 vCPUs, 1 NIC per vCPU to a Max vNIC: 8
VMs with <=2 vCPUs, Max vNICs: 2