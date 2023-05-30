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