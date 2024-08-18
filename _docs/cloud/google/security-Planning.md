---
title: Security - Planning
category: Google Cloud
order: 1
---
Security - Planning

Resources and data will be arranged in an Organization Hierarchy that aligns with their access control requirements and helps them achieve a Least Privileged Access Control and Separation of duties.

- define service account identities for Workloads running both on-prem and in the Cloud
- provide access to protected resources and data in Google Cloud

- Help Orgs manage and implement Authorization Controls and help define their Resource Hierarchy.

Sync AD with Cloud Identity using Cloud Directory Sync ? (cron job daily schedule)

Configure Cloud Identity to use the corporate Active Directory as a SAML2 Identity Provider and Google Cloud as a Service Provider. Roles will be bound to existing AD User and Group identities

- Prevent users from creating Service Accounts (with rare exceptions)
- use automated rotation of Google Key Management keys
- carefully audit that usage
- control who has access to which service accounts and audit how they are used to ensure alignment with requirements/compliance
- projects for dev, qa and prod (Projects may or may not have Standalone VPCs for workloads that require isolation)
- set constraints on which services can be enabled in parts of the hierarchy as well as which regions or zones can be used.
- set constraints around which identities from which domians can be granted access and how service accounts can be used

Customer will primarily assign access by binding predifined roles to Groups, aligning with the principles of Least Privilege and Separation of Duties. (they will always bind roles as low in the hierarchy as possible when the access is not required across multiple resources or projects)

