---
title: Database - Networking
category: Google Cloud
order: 1
---
Database - Networking


To Build a secure network to host the database server:
- All resources need to be in a projects, projects contain one or more VPCs which provide virtual networking, create a subnet for each region you want VMs located in.

[ VPCs are Global Resources - Subnets are Regional Resources ]


nb. By default, VMs in the SAME VPC can communicate with one another via their Internal IP Address, regardless of the region that they're in. Machines in DIFFERENT VPCs can communicate through EXTERNAL IP addresses instead of Internal Addresses. That means a VM with NO PUBLIC IP address is only reachable by other resources within the same VPC.

You can use MULTIPLE NETWORKS to control which machines are REACHABLE from other machines and to isolate machines from external sources.  

Firewall Rules can control which machines can communicate with one another through designated ports.

By default, ALL PORTS ARE CLOSED TO INGRESS (you must create ALLOW RULES to ALLOW for inbound traffic) but OPEN TO EGRESS (you must create DENY RULES to PREVENT outbound traffic).


Firewall Rules consist of targets which specify which machines in the VPC the rules apply to, and sources which specify which machines outside of the VPC the rules apply to.

When you enable the Compute Engine API in a project, GCP automatically creates a DEFAULT NETWORK.

This DEFAULT NETWORK contains a subnet for EACH REGION in GCP's - along with default ALLOW Firewall Rules for:
- SSH   (from all sources, you probably don't want this)
- RDP   (from all sources, you probably don't want this)
- HTTP
- HTTPS
- ICMP
- All Internal Traffic 


When creating a SUBNET, make sure the INTERNAL IP ADDRESS ranges DO NOT OVERLAP. Try to use SMALL CIDR ranges to reduce the chance of IP Overlap Conflicts.

The parameters for configuring a Firewall Rule include:
- Name (unique, use a consistent naming convention)
- Network
- Priority
- Ingress or Egress (DIRECTION - Ingress is DENIED by default, Egress is ALLOWED by default)
- Allow or Deny
- Target and Sources (TARGETS: all VMs, a tag(s) or a service account(s); SOURCES: usually IP Address ranges )
- Protocol and Ports (PROTOCOL: TCP, UDP or ICMP; PORTS: usually one or a range)

Each FIREWALL RULE is SCOPED to a NETWORK. If multiple rules conflict, then the PRIORITY determines which rule wins (LOWER NUMBERS have HIGHER PRIORITY).

Avoid using external IPs, they increase costs and weaken security.

Within Google Cloud all traffic is encrypted by default.  Try to use SSL/TLS outside. When you need to connect on-prem networks to Google Cloud resources use VPNs or Cloud Interconnect rather than External IPs.