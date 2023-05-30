---
title: Networks - Bring Your Own IP
category: Google Cloud
order: 1
---
Networks - Bring Your Own IP

Assign IP Addresses from an owned Public IP Range to Google Cloud Resources
- allows the rougint of traffic directly from the internet to assigned VMs without having to go through local physical networks
- managed the same way that GCP manages IP Addresses (once imported)
- In-use or Idle IP Addresses incur no charges
- Resources assigned BYOIPs can have Regional or Global scope (eg. a VM, or the forwarding rule of an internal or external Network Load Balancer)
- BYOIP ranges will be advertised to the public internet
- Cannot be assigned to: Classic VPN gateway, GKE Node, GKE Pod or an autoscaling MIG
- Cannot overlap with Subnet or Alias ranges in the VPC used by the customer
- Only IPv4 is supported

Caveats:
- Overlapping BGP Route Announcements can be problematic if Google and another network advertised the same route with matching or mismatched prefix lengths then BGP may fail (
  ( eg. unexpected routing and packet loss for 203.0.112.0/20 and 203.0.112.0/23 - here BGP Routing Practices cause the more Specific /23 Route to take precedence over the /20 )