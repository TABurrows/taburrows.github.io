---
title: Google Kubnernetes Engine
category: Google Cloud
order: 1
---
Google Kubnernetes Engine


Container-Optimized OS

Access Control Plane: private or public?

Enable Auto-upgrade

Use Cloud NAT for outbound connectivity

Control plane is not 100% accessible during upgrades (unless regional?)

Use Shielded GKE Nodes


Secret Management:
- Enable Application Layer Encryption for Sensitive data

gVisor Kernel = GKE Sandbox

gcloud artifacts docker images scan


## Preparation

CLI commands are easier to write if gcloud has some predefined properties:

```
# Set the default project property
gcloud config set core/project $CLUSTER_PROJECT

# Set the default cluster property
gcloud config set container/cluster $CLUSTER_NAME
```

## Services

Enable the GKE / Container API in a project:

```
gcloud services enable container.googleapis.com
```


## Usage

Authenticate to the Kubernetes API server within a GKE Cluster:

```
# Sign-in to the CLI
gcloud auth login

# Retrieve the K8s credentials for CLUSTER_NAME 
gcloud container clusters get-credentials $CLUSTER_NAME --region=$CLUSTER_REGION

# Verify K8s auth
kubectl cluster-info
```

Provide Service Account access with role binding:
```
gcloud projects add-iam-policy-binding $PROJECT \
    --member=serviceAccount:$SA_NAME@$PROJECT.iam.gserviceaccount.com \
    --role=roles/container.developer
```

## Contexts

A group of Access Parameters that define the target cluster, the user and the namespace currently used by the kubectl command:

```
kubectl config get-contexts
```