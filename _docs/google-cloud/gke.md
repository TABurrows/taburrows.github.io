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


## Services

Enable the GKE / Container API
```
gcloud services enable container.googleapis.com
```


## Usage

Authenticate to the Kubernetes API server within a GKE Cluster
```
# Sign-in to the CLI
gcloud auth login

# Retrieve the K8s credentials for CLUSTER_NAME 
gcloud container clusters get-credentials $CLUSTER_NAME --region=$CLUSTER_REGION

# Verify K8s auth
kubectl cluster-info

```