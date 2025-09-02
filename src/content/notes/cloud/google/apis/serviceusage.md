---
title: "Google Cloud API: serviceusage.googleapis.com"
summary: "Introduction to using the Service Usage API"
tags: [ "Google Cloud", "API", "APIs", "serviceusage.googleapis.com" ]
---

The API `serviceusage.googleapis.com` can be used to list and manage APIs and Services from Google, Google Cloud and 3rd Party Producers.


To list the usage per Organisation by Organization ID:

```shell
NOW=$(TZ=GMT date +"%Y-%m-%dT%H:%M:%SZ")
gcloud asset list \
--organization='ORGANIZATION_ID' \
--billing-project='BILLING_PROJECT_ID' \
--asset-types='serviceusage.googleapis.com/Service' \
--snapshot-time=$NOW \
--content-type='resource'
```

To list the usage per Project by Project ID:

```shell
NOW=$(TZ=GMT date +"%Y-%m-%dT%H:%M:%SZ")
gcloud asset list \
--project='PROJECT_ID' \
--billing-project='BILLING_PROJECT_ID' \
--asset-types='serviceusage.googleapis.com/Service' \
--snapshot-time=$NOW \
--content-type='resource'
```



To disable a service:

```shell
gcloud services disable pubsub.googleapis.com
```


To disable a service from the command line:

```shell
alias gcurl='curl -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json"'

gcurl -d '{}' "https://serviceusage.googleapis.com/v1/projects/${PROJECT_NUMBER}/services/pubsub.googleapis.com:disable"
```