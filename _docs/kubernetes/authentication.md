---
title: Authentication
category: Kubernetes
order: 1
---
Authentication

The API Server "kube-apiserver" (the Front End for the kubernetes control plane)

A normal User Principal can not be added to the authentication stack. 

However any User that presents a Valid Certificate SIGNED by the Cluster's Certificate Authority is considered authenticated.

API Request Authentication  Strategies:
- Client Certificates
- Bearer Tokens
- Authenticating Proxies

As HTTP Requests are made to the API Server, PLUGINS attempt to associate the following ATTRIBUTES with the request:
- Username
- UID
- Groups - a set of strings each of which indicates the user's MEMBERSHIP in NAMED LOGICAL COLLECTION of users eg. system:masters, devops-team
- Extra Fields - a map of strings to list of strings which holds additional information Authorizers may find useful

nb. all values are opaque to the AUTHENTICATION SYSTEM & only hold significance when interpreted by an AUTHORIZER.

Multiple AUTHENTICATION METHODS can be enabled - you would typically enable at least TWO METHODS:
- Service Account Tokens
- One other method for USER AUTHENTICATION
