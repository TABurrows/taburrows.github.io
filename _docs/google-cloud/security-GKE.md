---
title: Security - GKE Kubernetes 
category: Google Cloud
order: 1
---
Security - GKE Kubernetes



Containers use the Pod's network namespace, including its IP Address and Ports

Containers within a Pod can communicate across localhost/127.0.0.1

Workloads are implemented by Pods: applications, microservices, daemons, jobs

In GKE, each node is a separate Virtual Machine and has its ownn operating system

GKE manages the Control Plane internally and hides it from view; in the Cloud Console, you will not see a "Control Plane"

k8s secrets can be encrypted ( is done by default by GKE along with content stored at rest )

Pods use secrets to gain the access they need within an environment

A Secret is created using the k8s API and is only available in GKE

by default, Secrets created within Google Cloud are not available with k8s

use Workload Identity to configure a k8s Service Account to act as Google Service Account

Three types of account:
- Google Accounts
- Google Cloud Service Accounts
- Kubernetes Service Accounts
[ use principal of least privilege and go with a k8s service account ]


Hardening/strengthening Clusters:
- keep updated and patched ( in GKE the Control Planes are patched and upgraded automatically ) ( Node Auto-Upgrade automatically updates Nodes in the k8s cluster )
  - there are 3 types of automatic updates:
    - Rapid (quickest access)
    - Regular (default - regular cadence)
    - Stable (allow more time for feature validation)
- Regularly audit Cluster Configurations for Deviations from the defined settings. Common misconfigurations and recommendations can be automatically monitored using the new Security Health Analytics. When enabled it will run scans on your selected resources, twice a day at 12 hour intervals
- Limit the exposure of your Cluster Control Plane and Nodes to the internet. By default, GKE Cluster Control Plane and Nodes have internet-routable addresses - but these can de disabled at the time of cluster creation: "Private Cluster" = network-level protection to your GKE control plane:
  - Public Endpoint Access Disabled = prevents all internet access



