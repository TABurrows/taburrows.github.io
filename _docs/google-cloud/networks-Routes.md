---
title: Networks - Routes
category: Google Cloud
order: 1
---
Networks - Routes

SDWAN: Routes are APPLIED to VMs, rather than table-building at the edge

Routes:
- Define Network traffic Paths from a VM to other Destinations
- Apply to traffic that EGRESSES a VM
- The engine Forwards traffic to the MOST SPECIFIC route
- Deliver traffic only if it also MATCHES a FIREWALL RULE
- Can be fine-tuned with Network Tags (if a Route has a Network Tag, it can only be APPLIED to instances that have the SAME Network Tag. Routes WITHOUT Network Tags can apply to ALL VM Instances in the Network)
- Routing Tables are APPLIED to VMs (VM Routing Table) - simplified example:
  ```
  192.168.5.0/24
  10.146.0.0/20
  10.128.1.0/20
  0.0.0.0/0
  ```

A Route is created when a Network or Subnet is created, enabling traffic delivery from anywhere (allowing VMs on the same Network to communicate)

Route Types:
- System-generated
- Custom Static Routes
- Dynamic Routes
- Peering

(eg. Custom Routes can be used to route traffic between Subnets through a Network Virtual Appliance)



System Generated Routes:
eg. Default Route 0.0.0.0/0 ( IPv6 Default Route ::/0 for Dual-stack ) [ nb. Specificity matters, these routes are the Default Routes as they are the least Specific ]

IPv6 default:  ::/0 added on Dual-stacks

If the Default Route doesn't exist, it is not added

The IPv4 and IPv6 Default Routes that serve these purposes define a path OUT of the VPC Network to External IP Addresses of the internet

If you access Google APIs and Services without using a PRIVATE SERVICE CONNECT Endpoint, the Default Route can serve as the Path to Google APIs and Services

PRIVATE SERVICE CONNECT enables you to publish and consume Services by using the Internal IP Addresses that you define 
[ see Configuring Private Google Access and Accessing APIs from VM with External IP Addresses ]

DESTINATION SPECIFICITY
ROUTE PRIORITY INFLUENCE ROUTE SELECTION [ Routing Order ]

To Completely Isolate the Network from the Internet (or if you want to replace the Default Route with a Custom Route eg a Proxy VM), delete the Default Route

If you delete the Default Route and do not replace it, packets to IP Ranges not covered by other Routes are dropped


If you don't have Custom Static Routes that meet the routing requirements for PRIVATE GOOGLE ACCESS, deleting the Default Route might disable PRIVATE GOOGLE ACCESS


Some Orgs do not want a Default Route pointing to the Internet; instead they want the Default Route to point to an on-prem Network (by creating a Custom Route)

When you create a Subnet, system-generated Subnet Routes are automatically created


Subnet Routes:
- Apply to the Subnet, not to the whole network
- Always have the most specific destinations
- Cannot be overridden by higher priority routes (lower number equals higher priority)

Each Subnet has at least one Subnet Route whose destination matches the Subnet's Primary IP Range

If the Subnet has Secondary IP Ranges, each Secondary IP Address range has a corresponding Subnet Route



Custom Static Routes:
- Custom Static Routes forward packets to a Static Route next Hop and are useful for Small, Stable Topologies
- Benefits over Dynamic Routing:
  - Quicker Routing Performance (lower processing overhead)
  - More Security (no Route Advertisement)
- Limitations:
  - Cannot point to a VLAN Attachment
  - Require more maintenance, because Routes are not Dynamically updated




