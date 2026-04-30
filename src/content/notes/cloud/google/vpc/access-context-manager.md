---
title: "GCP: Access Context Manager cmds"
summary: "GCP: Access Context Manager cmds"
tags: [ "GCP", "ACM" ]
---

Access Context Manager defines and controls policies made up of Access Levels and Service Perimeters that logically constrain VPC access.

## List Access Levels

```
POLICY_NAME="1234567890"
OUTPUT_FORMAT="list" # 'list'=YAML, 'json'=JSON

gcloud access-context-manager levels list \
    --format=$OUTPUT_FORMAT \
    --policy=$POLICY_NAME
```

## List Service Perimeters

```
POLICY_NAME="1234567890"
OUTPUT_FORMAT="json" # 'list'=YAML, 'json'=JSON

gcloud access-context-manager perimeters list \
    --format=$OUTPUT_FORMAT \
    --policy=$POLICY_NAME
```
