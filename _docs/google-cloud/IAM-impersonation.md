---
title: IAM Impersonation
category: Google Cloud
order: 1
---
IAM Impersonation


When a PRINCIPAL, such as a USER or another SERVICE ACCOUNT, uses short lived credentials to authenticate as a service account, it's called impersonating the service account.

Impersonation is typically used to TEMPORARILY grant a user elevated access, because it allows users to temporarily ASSUME the roles that the service account has been granted.

Most audit logs include both the impersonating and impersonated.

Exmaples of Service Account Impersonation:
- A users runs a gcloud CLI command with the --impersonate-service-account flag.  This flag causes the gcloud CLI to create short-lived credentials for the service account, then run the command with those credentials (here, the user impersonates the service account)
- A user manually creates short-lived credentials using the Service Account Credentials API, then uses those credentials to authenticate. (here, the user impersonates the service account)
NOT Examples of Service Account Impersonation:
- A user attaches a service account to a resource (user doesn't authenticate AS the service account, therefore no impersonation)
- Code running on a resource makes authorized API calls using a resource's attached service account (code doesn't have an identity, so it can't impersonate a service account.  When code running on a resource authenticates as the resource's attached service account, the only relevant identity is the service account's)
- A user or application uses a service account key to authenticate as a service account. (using a serfvice account key to authenticate as a service account only involves one identity: the service account's, therefore using a key isn't service account impersonation)



Principals can use SERVICE ACCOUNTs to authenticate in a few different ways.  Each type of authentication requires the principal to have SPECIFIC IAM permissions on the service account.

There are ROLES you can grant to PRINCIPALS to LET THEM IMPERSONATE Service Accounts.  (there are permissions you will need in common scenarios)

nb. ROLES are GRANTED and REVOKED


## SHORT-LIVED CREDENTIALS

Types of Short-Lived Credentials:
- OAuth 2.0 access tokens, which you can use to authenticate with Google APIs
- OpenID Connect ( OIDC ) ID Tokens
- Signed JSON Web Tokens ( JWTs ) and Binary Blobs

## SERVICE ACCOUNT ROLES

The SERVICE ACCOUNT USER Role ( roles/iam.serviceAccountUser ) lets a principal ATTACH A SERVICE ACCOUNT TO A RESOURCE. When the code running on that resources needs to authenticate, it can get credentials for the attached service account.

This role does NOT allow PRINCIPALS to CREATE SHORT-LIVED CREDENTIALS for service accounts, or to use the '--impersonate-service-account' flag for the glcoud cli.  To complete these tasks, you need the SERVICE ACCOUNT TOKEN CREATOR ROLE ( roles/iam.serviceAccountTokenCreator ) on the Service Account.

This PREDEFINED ROLE contains the 'iam.serviceAccounts.getAccessToken' PERMISSION, which is required to IMPERSONATE A SERVICE ACCOUNT


## USING IMPERSONATION - glcoud

Use SERVICE ACCOUNT IMPERSONATION with gcloud:

1. Create short lived credentials
```
gcloud list buckets --impersonate-service-account=<SVC_ACC_EMAIL>
```
When you use this flag, the glcoud CLI requests SHORT-LIVED CREDENTIALS for the specified SERVICE ACCOUNT and uses them to AUTHENTICATE to the API and AUTHORIZE ACCESS.  The Principal that is LOGGED-IN to the gcloud CLI (usually your user account) must have the required permission on the SERVICE ACCOUNT.

2. Use impersonation by default
```
gcloud config set auth/impersonate_service_account <SVC_ACC_EMAIL>
```
With this CONFIG PROPERTY set, the gcloud CLI requests SHORT-LIVED CREDENTIALS for the specificed SERVICE ACCOUNT and uses them to authenticate to the API and AUTHORIZE ACCESS for EVERY COMMAND. The Principal that is logged in to the gcloud CLI must have the required permission on the SERVICE ACCOUNT.


## USING IMPERSONATION - Application Default Credentials

You can use SERVICE ACCOUNT IMPERSONATION to set up a local APPLICATION DEFAULT CREDENTIALS ( ADC ) file.  Client libraries that support impersonation can use those credentials automatically.

Local ADC files created using impersonation are supported in:
- Go
- Java
- Node.js
- Python

Use SERVICE ACCOUNT impersonation to create a local ADC file:
```
gcloud auth application-default login --impersonate-service-account <SVC_ACC_EMAIL>
```
