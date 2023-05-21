---
title: API Server
category: Kubernetes
order: 1
---
API Server (kube-apiserver)


Customization is possible to allow the cluster to run on an Untrusted Network.

The kube-apiserver (the Front End for the kubernetes control plane) - none of the other Control Plane componens are designed to expose remote services.

The kube-apiserver is configured to listen for remote connection on an HTTPs port (typically 443) with one or more forms of Client Authentication.