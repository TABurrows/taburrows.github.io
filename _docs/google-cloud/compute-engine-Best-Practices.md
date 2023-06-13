---
title: Compute Engine - Best Practices
category: Google Cloud
order: 1
---
Compute Engine - Best Practices


- ensure proper permissions are given to control access to resources. Projects form the base for creating, enabling and using all Google Cloud services including managing Resource Permissions. Utilize Projects and IAM Roles to control access.
- host GCE resources on the same VPC Network where they require network base communication. If the resources aren't related and don't require network communication among themselve, consider hosting them on different VPC Networks.
- use Cloud VPN and Cloud Interconnect to extend on-prem and 3rd party connections
- Use Cloud Audit Loggin to generate logs for API Operations performed in Google Compute engine. Audit logs help you determine: "who did what", "where", and "when". Specifically, Audit logs track how Compute Engine resources are modified and accessessed wihtin projects for Auditing Purposes.]
- By default 

