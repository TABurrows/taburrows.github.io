---
title: "Get Google Cloud Project IAM Bindings"
summary: "HOWTO: Get Google Cloud Project IAM Bindings"
tags: [ "Google Cloud", "gcloud" ]
---

## Get IAM Bindings

Get IAM Bindings for the current project only or for all bindings in the ancestry chain.

```bash
#!/bin/bash

PROJECT_ID="my-project-id-123"
FORMAT="json" # "list"=YAML, "json"=JSON


# To get list of bindings on the current project only
gcloud projects get-iam-policy $PROJECT_ID --format=$FORMAT


# To get list of bindings on the current project and all ancestors
gcloud projects get-ancestors-iam-policy $PROJECT_ID --format=$FORMAT
```