---
title: IAM - Service Accounts
category: Google Cloud
order: 1
---
IAM Service Accounts

Service Accounts are a special type of Google Account that grant permissions to VMs instead of end users. Primarily used to ensure safe, managed connections to APIs and Google Cloud Services ( used in granting access to trusted connections and rejecting malicious ones )

Service Accounts belong to Applications or VMs instead of Principals. The Application of VM will use Service Account credentials to call a Google Service API.

A Service Account is identified by its email address - which is unique to the account.

User-Managed Service Accounts:
When you create a new Cloud Project using Google Cloud Console and if Compute Engine API is enabled for your project, a Compute Engine Service Account is created for you by default:
```
PROJECT-NUMBER-compute@developer.gserviceaccount.com
```

If you project contains an App Engine Application, the default App Engine Service Account is create in your Project by default:
```
PROJECT_ID@appspot.gserviceaccount.com
```

Google APIs Service Account
Not visible in the Service Accounts section of the console, but visible in IAM Policy and in the Console, there are Service Accounts created and owned by Google representing Google Services and each account is automatically granted IAM Roles to access the Project.

Example:
```
PROJECT-NUMBER@cloudservices.gserviceaccount.com
```
This Service Account is designed specifically to run internal Google processes on Tenant's behalf.  By default, the account is automatically granted the Project Editor Role on the project and is listed in the IAM section of console. This service account is deleted only when the project is deleted. Do not touch.

98 other accounts can be added to your Project.

To create a Service Account:
```
gcloud iam service-accounts create service-account-name --display-name "my service account"
```

When granting IAM Roles, you can treat a Service Account either as a RESOURCE or as an IDENTITY. Your Application uses a Service Account as an Identity to authenticate Google Cloud Services. eg. if you have a Compute Engine VM running as a Service Account, you can Grant the Editor Role to the Service Account ( the IDENTITY ) for a PROJECT ( the RESOURCE ), at the same time, you might also want to control who can Start the VM.  You can do this by Granting a User ( the IDENTITY ) the 'serviceAccountUser' Role for the Service Account ( the RESOURCE ).

Granting Roles to a Service Account for specific Resources
You Grant Roles to a Service Account so that the Service Account has permission to complete specific actions on the resources in your Cloud Platform project.
eg. you might grant the 'storage.admin' Role to a Service Account so that it has control over objects and buckets in Cloud Storage


Applications and principals authenticate as a service account by doing one of the following:

- Obtaining short-lived credentials. In many cases, such as attached service accounts and commands using the gcloud CLI --impersonate-service-account flag, these credentials are obtained automatically—you don't need to create or manage them yourself
- Using a service account key to sign a JSON Web Token (JWT) and exchanging it for an access token. Service account keys are a security risk if they aren't managed correctly.

nb. Using a Service Account Key to sign a JSON Web Token (JWT) and exchanging it for an access token can be a method of authenticating, however Service Account Keys are a security risk if they aren't managed correctly - they are long lived and if they are lost, represent a security risk.


Granting Roles to Service Accounts
To grant Roles to a Service Account for a specific Resource:
```
 gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID --member serviceAccount:my-sa-name@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com --role roles/editor
```

When an Identity calls a Google Cloud API, Google Cloud Identity and Access Management requires that the Identity has the appropriate permissions to use the Resource.
Three types of Role:
- Primitive: Owner ( roles/owner ), Editor ( roles/editor ), Viewer ( roles/viewer )
- Predefined:
- Custom Roles


```

```


GKE Cluster: use Workload Identities, or Workload Identity Federation if you use an external Identity Provider






Don't:
- keep keys in source code repos / program binaries
- store keys in Secret Manager (it is for secrets, not encryption keys)

These work in parallel:
- IAM is a Policy
- Org Policies are a Policy

nb. Policy=constraint/restriction

nb. a VM does not need a service account, but it couldn't push logs etc.




If the Compute Engine API is enabled for your project, a Compute Engine Service Account is created for you by default:
```
<PROJECT-NUMBER>-compute@developer.gserviceaccount.com
```


If the project contains an App Engine application, the default App Engine Service Account is create in your project by default:
```
<PROJECT-ID>@appspot.gserviceaccount.com
```

Other Google Service Accounts:
Service Account for running internal Google Processes:
```
<PROJECT-NUMBER>@cloudservices.gserviceaccount.com
```
nb. It is NOT listed in the Service Account section fo Cloud Console. By default, this account is automatically granted the PROJECT EDITOR Role on the Project and is listed in IAM Section of the Cloud Console. This Service Account is deleted only when the Project is deleted.


Limited to 100 Uesr-managed Service Accounts in a project. If this quota does not meet your needs, you can use the Cloud console to request a Quota increase


To create a service account:
```
gcloud iam service-accounts create my-sv-acc --display-name "My Service Account"
```

#### Granting Roles to Service Accounts
When granting IAM Roles, you can treat a Service Account either as a Resource or as an Identity.

Service Accounts as Identity:
If you have a GCE VM running as a Service Account, you can grant the Editor Role to the Service Account (the Identity) for a Project (the Resource)

Service Accounts as Resources:
To control who can can start the VM, you can do this by granting a user (the Identity) the 'serviceAccountUser' ( "Requires the Service Account User role (roles/iam.serviceAccountUser) to be set for users who want to access VMs with this service account" ) Role for the Service Account (where here it is a Resource)



storage.admin = Role that can be granted to Service Account, so that it has control over objects and buckets in Cloud Storage

eg Role: bigquery.user = When applied to a project, access to run queries, create datasets, read dataset metadata, and list tables. When applied to a dataset, access to read dataset metadata and list tables within the dataset.

eg Role: bigquery = Access to view datasets and all of their contents






When changing the Permissions for a Role, you do not have to update the credentials file

Once you have the credentials.json file local, you can authorize the VM with the credentials you just uploaded with:
```
gcloud auth activate-service-account --key-file credentials.json
```