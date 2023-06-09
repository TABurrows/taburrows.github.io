---
title: Networks - Cloud NAT
category: Google Cloud
order: 1
---
Networks - Cloud NAT

When applied to a Subnet GCP automatically enables Private Google Access (and can't be disabled manually) for that range thus any VMs in that Subnet use Private Google Access to connecto to Google APIs and Services. With Private Google Access, Cloud NAT never performs NAT for traffic sent to the select external IP addresses of Google APIs and Services.

- Not dependent on a single, physical gateway device
- is a distributed, software-defined managed service

You configure a NAT Gateway on a Cloud Router which provides the Control Plane for NAT. Cloud Router contains the NAT configuration parameters.