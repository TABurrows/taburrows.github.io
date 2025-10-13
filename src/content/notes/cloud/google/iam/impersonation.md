---
title: "Google Cloud: Identity Impersonation"
summary: "Notes on Google Cloud identity impersonation"
tags: [ "Google Cloud", "IAM", "Impersonation" ]
---

## GCP Identity Impersonation


To use the impersonated service account for a gcloud command:

```
SERVICE_ACCOUNT_EMAIL="<SERVICE_ACCOUNT_EMAIL>"
gcloud storage buckets list --impersonate-service-account=$SERVICE_ACCOUNT_EMAIL
```



To set the session to act as the impersonated service account:

```
SERVICE_ACCOUNT_EMAIL="<SERVICE_ACCOUNT_EMAIL>"
gcloud config set auth/impersonate_service_account $SERVICE_ACCOUNT_EMAIL
```

