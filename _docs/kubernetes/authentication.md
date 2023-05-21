---
title: Authentication
category: Kubernetes
order: 1
---
Authentication

The API Server "kube-apiserver" (the Front End for the kubernetes control plane)

A normal User Principal can not be added to the authentication stack. 

However any User that presents a Valid Certificate SIGNED by the Cluster's Certificate Authority is considered authenticated.