---
title: "Google Cloud API: Implement gcurl command"
summary: "Create the gcurl alias command for quicker use of curl with Google Cloud"
tags: [ "gcurl", "curl", "API", "APIs"]
---

The following commands create an alias called `gcurl` with the OAuth2 Access token and content type correctly defined for calls to Google Clouds APIs.

```shell
alias gcurl='curl -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json"'
```