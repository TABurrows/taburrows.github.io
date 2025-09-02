---
title: "Kubernetes: StatefulSet"
summary: "An overview of the StatefulSets in Kubernetes"
tags: [ "Containers", "Kubernetes", "StatefulSet" ]
---

## Notes

StatefulSet is the workoad API object used to manage stateful applications.

Manages the deployment and scaling of a set of Pods and provides guarantess about the ordering and uniqueness of these Pods.

A StatefulSet managers Pods that are based on an identical container spec (like Deployments)

Unlike Deployments though a a StatefulSet maintains a sticky identity for each of its Pods.  These Pods are created from the same spec, but are NOT interchangeable: each has a persistent identifier that it maintains ACROSS ANY RESCHEDULING.


You can use Storage Volumes to provide persistence for the Workload, you can use a StatefulSet as part of the solution. Although individual Pods in a StatefulSet are SUSCEPTIBLE TO FAILURE, the PERSISTENT POD IDENTIFIERS make it easier to match existing volumes to the new Pods that replace the failures.


Used in applications that require one or more:
- stable, unique network identifiers
- stable, persistent storage
- ordered, graceful deployment and scaling
- ordered, automated rolling updates

