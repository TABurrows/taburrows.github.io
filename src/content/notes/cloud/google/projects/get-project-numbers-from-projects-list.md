---
title: "Get Google Cloud Project Numbers"
summary: "HOWTO: Get Google Cloud Project Numbers from a list of Projects"
tags: [ "Google Cloud", "gcloud" ]
---

## Get a list of Project Numbers



```bash
#!/bin/bash

# Create an Array of Project IDs
PROJECTS=(
    my-project-001
    my-project-002
    my-project-003
    my-project-004
    my-project-005
    my-project-006
    my-project-007
    my-project-008
)


# Iterate over the PROJECTS Array and process each entry
for PROJECT_ID in ${PROJECTS[*]}
do
    PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
    printf "\n${PROJECT_ID},${PROJECT_NUMBER}\n"
done
printf "\n\ndone\n\n"
```
