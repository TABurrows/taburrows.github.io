---
title: "Tools: Extract a Google Cloud Project to Terraform"
summary: "HOWTO extract a Google Cloud Project to Terraform"
tags: [ "Google Cloud", "Terraform" ]
---

## Extract a Project

Prerequisites: Ensure the `cloudasset.googleapis.com` is enabled and the executor of the script has the `roles/cloudasset.viewer` role granted

```bash
#!/bin/bash

set -e

# Define variables
TARGET_PROJECT="<target-project-id>"

# Build variables
USER="$(gcloud config get-value account)"
OUTPUT_DIRECTORY="$TARGET_PROJECT"
RESOURCES_FILE="resource-types-${TARGET_PROJECT}.txt"
OLD_CORE_PROJECT="$(gcloud config get-value core/project)"

# Enable cloudasset.googleapis.com on target project
# gcloud services enable cloudasset.googleapis.com --project="$TARGET_PROJECT"

# Grant Cloud Asset Viewer role to script executer
# gcloud projects add-iam-policy-binding $TARGET_PROJECT --member="user:$USER" --role="roles/cloudasset.viewer"

# Set core project to Target Project
gcloud config set core/project $TARGET_PROJECT

# Create the output directory if it does not exist
if [ ! - d "$TARGET_PROJECT" ]; then
    mkdir -p $TARGET_DIRECTORY
fi

# Get all resource types in the target into a resources file
gcloud beta resource-config list-resource-types --format='value[separator="\n"](GVK.Kind)' --project=$TARGET_PROJECT > $RESOURCES_FILE

# Bypass storage by requesting each resource type from the file
gcloud bet resource-config bulk-export \
    --path=$OUTPUT_DIRECTORY \
    --project=$TARGET_PROJECT \
    --resource-types-file=$RESOURCES_FILE \
    --resource-format=terraform

# Return core project value back
gcloud config set core/project $OLD_CORE_PROJECT

```
