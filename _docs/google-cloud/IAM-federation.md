---
title: Identity Federation
category: Google Cloud
order: 1
---
Google Cloud - Identity Federation



## Workforce Identity Federation

WORKFORCE IDENTITY FEDERATION lets you use an EXTERNAL IdP to Authenticate and Authorize a WORKFORCE - a group of users such as employees, contractors, partners etc - using IAM, so that the users can access GOOGLE CLOUD SERVICES.

With WORKFORCE IDENTITY FEDERATION, you DON'T need to synchronize user identities from your existing IdP to Google Cloud Identities, as you would with CLOUD IDENTITY's GOOGLE CLOUD DIRECTORY SYNC ( GCDS ). Workforce Identity Federation extends Google Cloud's identity capabilities to support syncless, attribute-based single sign-on.

After USER AUTHENTICATION, information that is received from the IdP is used to determine the scope of ACCESS to the GCP Resource.

Can be used with any IDENTITY PROVIDER that supports: 
- OpenID Connect 
- SAML 2.0
[ such as, Azure AD, AD FS, Okta, Auth0 etc ]


### Workforce Identity Pools

Let you manage groups of Workforce Identities and their access to Google Cloud resources.

Pools let you do the following:
- Group user identities; for example, employees or partners
- Grant IAM access to an entire pool or a subset thereof
- Federate Identities from one or more IdPs
- Define Policies on a group of users that require similar ACCESS PERMISSIONS
- Specify IdP-specific configuration information, including:
    - Attribute Mapping
    - Attribute Conditions
- Enable the gcloud CLI and API access for Third-Party Identities
- Log access by users within a pool to Cloud Audit Logs along with the pool ID


## Workload Identity Federation

Using WORKLOAD IDENTITY FEDERATION, workloads that run on AWS EC2 and Azure can exchange their ENVIRONMENT-SPECIFIC CREDENTIALS for SHORT-LIVED Google Cloud SECURITY TOKEN Service Tokens (STS)

Environment-specific credentials include the following:
- AWS EC2 instances can use Instance Profiles to request TEMPORARY CREDENTIALS
- Azure VMs can use Managed Identities to obtain AZURE ACCESS TOKENs

By setting up Workload Identity Federation, you can let these Workloads exchange these environment-specific credentials against short-lived Google Cloud credentials.  Workloads can use these short-lived credentials to access Google Cloud APIs.

