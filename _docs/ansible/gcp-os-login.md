---
title: GCP OS Login
category: Ansible
order: 1
---
GCP OS Login


To use Ansible in an environment where OS Login is required, create a Service Account for Ansible to apply transforms to your infrastructure.


#### Create the Service Account

To create the service choose an account id and display name:
```
gcloud iam service-accounts create svc-acc-ansible --display-name "Ansible Provisioner Service Account"
``` 

#### Add the required Roles

The Service Account will need the following roles:

- roles/compute.instanceAdmin
- roles/compute.osAdminLogin
- roles/iam.serviceAccountUser


So add these roles as IAM Policy Bindings to the Service Account:
```
PROJECT_ID="<MY_PROJECT_ID>"
for role in \
    'roles/compute.instanceAdmin' \
    'roles/compute.osAdminLogin' \
    'roles/iam.serviceAccountUser'
do \
    gcloud projects add-iam-policy-binding \
        $PROJECT_ID \
        --member="serviceAccount:svc-acc-ansible@$PROJECT_ID.iam.gserviceaccount.com" \
        --role="${role}"
done
```

#### Generate and IAM JSON Key

An IAM JSON Key is used to interact with the Google Cloud API.

Generate an IAM JSON Key for the new service account:
( NOTE: This will not be possible with the constraint: constraints/iam.disableServiceAccountKeyCreation enabled
To disable this constraint: IAM & Admin -> Organization Policies -> 'Disable service account key creation' -> 'Manage Policy' -> Enforcement: off )
```
PROJECT_ID="<MY_PROJECT_ID>"
gcloud iam service-accounts keys create \
    gcp-iam-key-svc-acc-ansible.json \
    --iam-account=svc-acc-ansible@$PROJECT_ID.iam.gserviceaccount.com
``` 

Output will be something like:
```
created key [bcede839f2d85babc12345768c81e44e529] of type [json] as [gcp-iam-key-svc-acc-ansible.json] for [svc-acc-ansible@<MY_PROJECT_ID>.iam.gserviceaccount.com]
```

It is a common convention to store this GCP JSON key in ~/.gcp/

Ensure the local access permissions on the key are restricted to the relevant local user.


#### Generate an SSH key for the Service Account

Generate a public / private key pair.  The generated private key will be stored locally on the generating machine, whilst the public key will be injected into our instance by the OS Login service allowing remote service account access from ssh clients such as Ansible.  

We will use the GCP Key created above to authorized the request to inject the generated public key into instances via the OS Login service.

Generate a public / private key pair locally with the given file name (leave the passphrase blank - these are unsupported in GCP VMs at the time of writing ):
```
ssh-keygen -f ~/.ssh/ssh-key-svc-acc-ansible
```

Ensure the access permissions and ownership details are restricted to the local user for the private key and read-only for all other users on the public key.

#### Activate the Service Account

Now authorize Service Account access to Google Cloud.  We will use the GCP Key created above for this authorization.
```
gcloud auth activate-service-account --key-file=/home/user/.gcp/gcp-iam-key-svc-acc-ansible.json
```
Output will be something like:
```
Activated service account credentials for: [svc-acc-ansible@<MY_PROJECT_ID>.iam.gserviceaccount.com]
```

#### Add SSH Key to OS Login 

To login in with the private ssh key we generated above, we need to assign the public ssh key to our Service Account user within the OS Login service.

```
gcloud compute os-login ssh-keys add --key-file=/home/user/.ssh/ssh-key-svc-acc-ansible.pub
```

nb. Ensure you choose the public key


#### Establish local Auth

The above activation process will set your local gcloud configuration environment to those of the Service Account.  

This can be confirmed with gcloud:
```
gcloud config list

gcloud auth list
```

To set the local gcloud configuration environment back to your own authentication and authorization details:
```
gcloud config set account user@domain.com
```

And confirm the above action with gcloud:
```
gcloud config list

gcloud auth list
```






#### Test Ansible Connectivity

The Ansible Service Account should now be able to login to instances using the OS Login process. So let's test that (we'll need an instance to test against)

The Service Account ID is used to form the user name in OS Login, so first we need this value:
```
PROJECT_ID="<MY_PROJECT_ID>
gcloud iam service-accounts describe \
    svc-acc-ansible@$PROJECT_ID.iam.gserviceaccount.com \
    --format='value(uniqueId)'
```
Output will be something like:
```
104583570194198810035
```
So here the  OS Login username will be:
```
sa_104583570194198810035
```

And we can test that username against our instance with:
```
ssh -i ~/.ssh/ssh-key-svc-acc-ansible sa_104583570194198810035@<INSTANCE_IP>
```

Success will be indicated via a command prompt on the remote machine:
```
sa_104583570194198810035@<INSTANCE-NAME>:~$ 
```

NOTE: If the connection appears to hang or is unresponsive on establishing a connection, then a Firewall Rule or policy may be present/absent and therefore dropping any ssh connection attempts to the remote host



#### Use with Ansible

You can specify the ssh key and user in locations such as host_vars and group_vars


