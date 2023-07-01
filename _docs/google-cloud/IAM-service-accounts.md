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
This Service Account is designed specifically to run internal Google processes on Tenant's behalf.  By default, the account is automatically granted the Project Editor Role on the project and is listed in the IAM section of console. This service account is deleted only when the project is deleted.


nb. Service Accounts are long living and are a risk if lossed


GKE Cluster: use Workload Identities, or Workload Identity Federation if you use an external Identity Provider

Short-lived credentials



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
To control who can can start the VM, you can do this by granting a user (the Identity) the 'serviceAccountUser' Role for the Service Account (where here it is a Resource)



storage.admin = Role that can be granted to Service Account, so that it has control over objects and buckets in Cloud Storage

eg Role: bigquery.user = When applied to a project, access to run queries, create datasets, read dataset metadata, and list tables. When applied to a dataset, access to read dataset metadata and list tables within the dataset.

eg Role: bigquery = Access to view datasets and all of their contents