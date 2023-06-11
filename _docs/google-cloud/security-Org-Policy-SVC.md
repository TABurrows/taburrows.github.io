---
title: Security - Organisation Policy Service
category: Google Cloud
order: 1
---
Security - Organisation Policy Service


Gives BOTH centralized and programmatic control over Org's Cloud Resources

To define an Org Policy, you choose a constraint, which is a particular type of restriction against either a Google Cloud Service or a Group of Services
eg.
```
compute.trustedImageProjects
```

compute.trustedImageProjects - enforce which images can be used in Org

To Apply a Policy:
First, get the existing policy via:  
```
gcloud resource-manager org-policies describe compute.trustedImageProjects --project=<project-id> --effective > policy.yaml
```

which returns something like the following in the policy.yaml file, edit this:
```
constraint: constraints/compute.trustedImageProjects
listPolicy:
    allowedValues:
        - projects/debian-cloud
        - projects/cos-cloud
    deniedValues:
        - projects/<IMAGE-PROJECT>
```

and finally apply the edited policy.yaml to the project:
```
gcloud resource-manager org-policies set-policy policy.yaml --project=<project-id>
```