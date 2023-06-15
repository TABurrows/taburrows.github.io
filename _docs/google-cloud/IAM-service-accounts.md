---
title: IAM - Service Accounts
category: Google Cloud
order: 1
---
IAM Service Accounts

nb. Service Accounts are not recommended, they are long term and a risk of loss


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
