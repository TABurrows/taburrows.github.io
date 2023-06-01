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

Moving a Project into a different Organization will update the Project's IAM Policy to inherit the new Parent's Policy

Child Policies can NOT restrict access granted at the Parent Level - best Practice is to follow the principle of Least Privilege

Select the smallest SCOPE for Identities, Roles and Resources

Deny Policies take precedence over Access Policies - they provide more granular control
- define rules that PREVENT certain Principals from using certain Permissions, regardless of the roles they're granted
- Each Project, Folder and Org can have up to 5 Deny Policies attached to it

Refine Acces by Applying Policy constraints