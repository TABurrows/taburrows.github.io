---
title: "Kubernetes: ReplicaSet"
summary: "An overview of the ReplicaSets in Kubernetes"
tags: [ "Containers", "Kubernetes", "ReplicaSet" ]
---

## Notes

- Maintain a stable set of *replica* Pods running across the cluster at any given time - often used to guarantee the availability of a specified number of identical Pods


Approach: Define a Deployment and let that Deployment manage ReplicaSets automatically


A ReplicaSet is linked to its Pod via the Pods' via the `metadata.ownerReferences` field (specifies what resource the current object is owned by). All Pods acquired by a ReplicaSet have their owning ReplicaSet's identifying information within their `ownerReferences` field - it's through this link that the `ReplicaSet` knows of the state of the Pods it manages.


A ReplicaSet identifies new Pods to acquire by using its SELECTOR.

If there is a Pod that has no `OwnerReference` or the `OwnerReference` is not a `Controller` and it matches a `ReplicaSet`'s selector, it will be immediately acquired by that matching selector ReplicaSet.

Recommnedation: use `Deployments` instead of directly using `ReplicaSets` unless you require custom UPDATE ORCHESTRATION behaviour or don't require updates at all.




