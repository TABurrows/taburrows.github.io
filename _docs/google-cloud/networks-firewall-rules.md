---
title: Networks - Firewall Rules
category: Google Cloud
order: 1
---
Networks - Firewall Rules

Logging is turned on per rule (off by default)

Firewall rules - protect from UNAPPROVED Inbound (Ingress) and Outbound (Egress) connections:
- Targets:
  - All Instances in Network
  - Specified TARGET TAGS
  - Specified SERVICE ACCOUNTS
- Sources:
  - IP Ranges
  - Subnets
  - Specified SOURCE TAGS
  - Specified SERVICE ACCOUNTS


FW Rules are applied at the NETWORK level of the Hierarchy,  connections are allowed or denied at the INSTANCE LEVEL (SD Networking - every VPC Network functions as a Distributed Firewall)

Best Practice: use SERVICE ACCOUNTS (which are controlled by IAM)

You can't mix Source Network Tags with Target SVC Accounts, or Source SVC Accounts with Target Network Tags