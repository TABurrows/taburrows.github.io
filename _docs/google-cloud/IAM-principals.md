


IAM - PRINCIPALS

A PRINCIPAL is an IDENTITY that can be granted access to a resource.

In Policies, it is often: user | group | serviceAccount | domain


- user & group & serviceAccount have emails as prinicipal identifiers
- domains have domains as principal identifiers


For AUTHENTICATION, GCP only supports two types of principals: USER ACCOUNTS & SERVICE ACCOUNTS


## User Accounts

User Accounts represent a PERSON such as Developer, Administrator, Director etc who interacts with Google APIs and Services.

User Accounts are managed as GOOGLE ACCOUNTS, either with GOOGLE WORKSPACE or CLOUD IDENTITY.  They can also be User Accounts that are managed by a 3rd Party Identity Provider and federated with WORKFORCE IDENTITY FEDERATION.

With a User Account, you can authenticate to Google APIs and Services in the following ways:

- use gcloud CLI to set up APPLICATION DEFAULT CREDENTIALS
- use gcloud CLI to generate ACCESS TOKENS ( for querying APIs - needs gcloud services enable cloudresourcemanager.googleapis.com )
- use your User Credentials to IMPERSONATE a SERVICE ACCOUNT
- use your User Credentials to LOG IN to the gcloud CLI, then use the tool to access Google Cloud services


nb. your gcloud credentials are not the same as the credentials you provide to ADC using the glcoud CLI. Whne you sign int to gcloud CLI, you use the 'gcloud auth login' command to provide your user credentials, which the gcloud CLI uses for authentication and authorization to manage Google Cloud Resources and Services <- these are your gcloud CLI credentials.  When you use gcloud CLI to provide your ADC Credentials you sue the 'gcloud auth application-default login' command. This command puts your credentials into a WELL-KNOWN LOCATION for use by ADC in your LOCAL ENVIRONMENT. These are your LOCAL ADC CREDENTIALS.