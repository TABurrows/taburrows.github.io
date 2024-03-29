---
title: IAM - Service Accounts
category: Google Cloud
order: 1
---
## IAM Service Accounts

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





Access Denied message:
```
ERROR: (gcloud.compute.firewall-rules.list) Some requests did not succeed:
  - Request had insufficient authentication scopes.
```
When changing the Permissions for a Role, you do not have to update the credentials file

Once you have the credentials.json file local, you can authorize the VM with the credentials you just uploaded with:
```
gcloud auth activate-service-account --key-file credentials.json
```

Sample credentials.json contents:
(note Client x509 Cert URL is downloadable)
```
{
  "type": "service_account",
  "project_id": "project-e46dc511c45b",
  "private_key_id": "40c9509bd6aaa9a6fa54f754872d4dfbcef2093a",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVpGCVrmE1Zr0v\ngvQC+YOBw+DN3yqPERastSVFLyrebpKZEFlipRAZKnBb8tG/FfSWfPLvo6hVJB3k\n2MLowM0PWk6yETvusNHU8aZ7EHmYYQDs1iGearZfZR3/gULeqWS0+C32Z0Re20qL\nZjEmI1KDAvAFCbIalX8TR9+ao0paFOwL8A8XPYJXQvqb6in0mCtwMaoapN+5tuND\nKgJgPdVO+ZZU4ArBcHMxmD
  (redacted ...)+jYaYtooVV\nRlfAQgMoY6A8T63FzTfVvWDxxK4VwyDrtw2091lJEQKBgAfAGJ8bujsRo5hGa2rH\nFtZIIkUKnxfsoEVnxjryZlZkJVu07PCHHBsk6V9M3otiKDeBetBXRQEyMYqEdSnH\nKIBgDlBx7atCG0GXfCxnJCRtzaHJBYArj3ooJFgJsd2wZV4QV+gN0cBTxKR8z+UL\nNMKkl15AOMAP5Sk2GXjZ1FQZ\n-----END PRIVATE KEY-----\n",
  "client_email": "network-admin@qwiklabs-gcp-00-e46dc511c45b.iam.gserviceaccount.com",
  "client_id": "105759752284160033512",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/network-admin%40project-e46dc511c45b.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```



## Rotation of User-managed Service Account Keys

Using the GCP Console:
You configure automatic key rotation in the GCP Console for existing keys by following these steps:

- Open the Key Management page from the Google Cloud Console
- Select the name of the key ring that contains the key you want to rotate
- Select the key you want to set up automation rotations
- Choose Edit Rotation Period in the header



## Authorize Service Account

Use the gcloud auth activate-service-account command to import the credentials from the JSON file with the private authorization key for the service account and activate it for use

```
gcloud auth activate-service-account
```


## Alternatives to using SERVICE ACCOUNT KEYS

- Authenticate with User Credentials
- Impersonate a SERVICE ACCOUNT
- Configure Workload Identity
- Attach a SERVICE ACCOUNT
- Configure Workload Identity Federation
- Lastly, use a SERVICE ACCOUNT KEY =(



## Best Practices

Since SERVICE ACCOUNTS use RSA Key Pairs for authentication, they are vulnerable to capture and misuse.

If you know the PRIVATE KEY of a SERVICE ACCOUNTS Key Pair, you can use the PRIVATE KEY to CREATE A JWT BEARER TOKEN and use the bearer tokenn to request an ACCESS TOKEN. The resulting ACCESS TOKEN reflects the SERVICE ACCOUNTS IDENTITY and you canuse it to interact with Google Cloud APIs on the SERVICE ACCOUNTS behalf.  The PRIVATE KEY lets you AUTHENTICATE as the SERVICE ACCOUNT, so having access to a private key is similar to having access to a password.

MAIN THREATS:
- Credential Leakage ( keys ending up where they are not supposed to )
- Privilege Escalation  ( key used to escalate privs )
- Information Disclosure ( disclosure via metadata )
- Non-repudiation ( threat actor can conceal their activity )

AVOID USER-MANAGED SERVICE ACCOUNT KEYS - use IAM CONDITIONS and VPC SERVICE CONTROLS ot restrict what resources can potentially be accessed by a compromised SERVICE ACCOUNT.


The PRIVATE KEY is known as the SERVICE ACCOUNT KEY.

The KEY-PAIRS used by SERVICE ACCOUNTS fall into 2 categories:

- GOOGLE-MANAGED


- USER-MANAGED

