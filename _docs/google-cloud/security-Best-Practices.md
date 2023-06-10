---
title: Security - Best Practices
category: Google Cloud
order: 1
---
Security - Best Practices

1. Securing Compute Engine - IAM Roles, API Scopes and Service Accounts; VM Logins, Org Policy controls; Shielded VMs and Confidential VMs; Certificate Authority Service; Best practices for Securing Compute Engine

Service Accounts: 
an identity that a resource such as a VM Instance can use to run API Requests on your behalf; associated with a VM; when specified, a VM Authenticates using the identity fo that service account when making calls to the Google APIs; (it is also possible to specify No SVC Acc association - in this case VMs would not assume the identity of the SVC Account by default and will need to be manually configured to make API Requests);

every project has a Default Service Account that is automatically created when Compute Engine is first enabled for the Project. In this instance the service account is assigned the role of 'Project Editor' and is used by default when launching VMs.

you can creaet and manage your own SVC Accounts using IAM

User Accounts are granted permission by Role assignment

User-managed Service accounts do not use the "Access Scope" concept, instead Permissions are controlled through the IAM Roles assigned to the account.

Applications running on Instances associated with the SVC ACC can make Authenticated requests to other Google APIs using the SVC Acc Identity;






2. Securing Cloud Data






3. Application Security






4. Securing Kubernetes



