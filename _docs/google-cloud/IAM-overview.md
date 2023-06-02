---
title: Identity & Access Management
category: Google Cloud
order: 1
---
Identity & Access Management

Org Heirarchy:
- Org Root Node
- Folders
- Projects - represent a Trust Bounday within a Company whereby Services within the same Project have a default Level of Trust
- Resources

Each Resource has exactly ONE Parent

Policy contains a set of Roles and Members

Refine Acces by Applying Policy constraints

Moving a Project into a different Organization will update the Project's IAM Policy to inherit the new Parent's Policy

Child Policies can NOT restrict access granted at the Parent Level - best Practice is to follow the principle of Least Privilege

Select the smallest SCOPE for Identities, Roles and Resources

Deny Policies take precedence over Access Policies - they provide more granular control
- define rules that PREVENT certain Principals from using certain Permissions, regardless of the roles they're granted
- Each Project, Folder and Org can have up to 5 Deny Policies attached to it

In addition to BASIC ROLES, PREDEFINED ROLES (ROLE=Collection of Permissions): 
- granular access to specific GCP Resources
- prevent unwanted access to other resources

PERMISSIONS = CLASSES and METHODS:
eg compute.networks.list = service.resource.verb
compute.addresses.list
compute.backendBuckets.list
compute.firewalls.
compute.sslCertificates.get
compute.sslCertificates.list

PREDEFINED ROLES:
Network Viewer: read-only acces to all networking resources
Network Admin: craete, modify and delete networking resouorces except for Firewall Rules and SSL Certificates but read-only for Firewall Rules, SSL Certs and Instance Ephem IPs
Security Admin: create modify and delete Firewall Rules and SSL Certificates

CUSTOM ROLES
Combine distinct permissions together for fine-grained principle-of-least-privilege access