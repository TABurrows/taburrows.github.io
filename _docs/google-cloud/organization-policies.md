---
title: Organization Policies
category: Google Cloud
order: 1
---
Organization Policies


Use Organization Policies to enforce specify security and compliance requirements such as requiring that all resources be created with specific permissions or preventing users from creating certaing types of resources.

Implementation example:

You don't want anyone in your Organization to generate new external Service Account Keys. You also want to restrict every new Service Account's usage to its associated Project.

Actions:

- Navigate to 'Organizational Policies'
- Select Organization
- Select 'iam.disableServiceAccountKeyCreation'
- Customize the applied to property, and set 'Enforcement' to 'On'
- Click Save

Repeat the above process for 'iam.disableCrossProjectServiceAccountUsage'

Boolean Contraints help you limit Service Account usage.
iam.disableServiceAccountKeyCreation will restrict the creation of new external Service Account keys.
iam.disableCrossProjectServiceAccountUsage will prevent Service Accounts from being attached to resources in other projects.


Export the attached Org ID
```
export ORG_ID=$(gcloud organizations list --format 'value(ID)')
```

List Org Level Org Policies
```
gcloud resource-manager org-policies --organization $ORG_ID
```

List all set and unset Org Policies
```
gcloud resource-manager org-policies list --show-unset --organization $ORG_ID
```

List the names of the Org Polcy constraints
```
gcloud resource-manager org-policies list --organization $ORG_ID --format='value(constraint.basename())'
```

Use describe with a contraint name to see the set values
```
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations --organization $ORG_ID
```



