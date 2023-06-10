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

Access Scopes provide the ability to limit what permissions are allowed when using the DEFAULT SERVCIE ACCOUNT; before IAM ROLES, ACCESS SCOPES were the only mechanism for granting permissions to SVC Accounts; Although they are not the primary way of granting PERMS now, you must still configure ACCESS SCOPES when initiating an Instance to run under the Default Service Account; remember: that ACCESS SCOPES only apply on a PER-INSTANCE BASIS. You set ACCESS SCOPES when creating an Instance and the ACESS SCOPES persists only for the life of the Instance.

There are several options when setting ACCESS SCOPES:
- "Allow Default Access" is actually very narrow and allows READ-ONLY ACCESS to Cloud Storage as well as access to Cloud Logging and Cloud Monitoring; other API Access using the Default Service Account will obviously be restricted. The DEFAULT ACCESS SCOPE therefore does not include access to OTHER APIs such as BigQuery, Datastore, Cloud SQL, Pub/Sub, or Cloud BigTable
- "Allow Full Access" access scope is also available and this grants access to ALL APIs.




2. Securing Cloud Data






3. Application Security






4. Securing Kubernetes



