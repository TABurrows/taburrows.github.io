---
title: IAM - Service Accounts
category: Google Cloud
order: 1
---
IAM Service Accounts

nb. Service Accounts are not recommended, they are long term and a risk of loss


GKE Cluster: use Workload Identities, or Workload Identity Federation if you use an external Identity Provider

Short-lived credentials



Don't:
- keep keys in source code repos / program binaries
- store keys in Secret Manager (it is for secrets, not encryption keys)

These work in parallel:
- IAM is a Policy
- Org Policies are a Policy

nb. Policy=constraint/restriction

nb. a VM does not need a service account, but it couldn't push logs etc.