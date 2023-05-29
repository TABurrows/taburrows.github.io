---
title: Networks
category: Google Cloud
order: 1
---
Networks

Every Network has a default route that directs to destinations that are outside the network

Routes can be created to override default routes

Routes + Firewall determine a packets ability to reach its destination

The Default Network has a pre-configured firewall rules that allow all instances in the network to communicate.

Manually created Networks do not have such rules - they must be created

Projects can containe MULTIPLE VPCs (unless you creat an Org Policy that prevents this)

New Projects start with an Auto-Mode VPC Network that has 1 Subnet in each Region

