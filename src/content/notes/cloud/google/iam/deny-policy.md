---
title: "Google Cloud: IAM Deny Policy"
summary: "How to use the Google Cloud IAM Deny Policy engine"
tags: [ "Google Cloud", "IAM Deny Policy" ]
---

## Notes

In the `rules` array order doesn't matter, there is no specificity, and individual rules have `OR` logic applied with the first rule returning `true` invoking the deny.  If all rules return `false`, no deny is applied.

In Deny Policy, the property `denialCondition` contains Common Expression Language that qualifies the attached rule.

Principals in the `exceptionPrincipals` array are excluded from the rule returning true even if they are present in the `deniedPrincipals` array.

## Examples

The following example creates a deny policy that prevents anyone from accessing BigQuery Datasets outside of UK Business Hours or from networks outside the 10/8 address range. Additionally there is a rule that will deny access to resources tagged as confidential to anyone not a member of the `confidential-data-admins` group.

Create a file called bigquery-protection-ruleset.json and populate with the following JSON:

```json
{
  "displayName": "Protect BigQuery Datasets",
  "rules": [
    {
      "description": "Prevent accessing BigQuery datasets from outside the organization's private IP Address Range",
      "deniedPrincipals": [
        "principalSet://goog/public:all"
      ],
      "deniedPermissions": [
        "bigquery.googleapis.com/*"
      ],
      "denialCondition": {
        "title": "Request originated from outside the Organisation",
        "expression": "!request.ip.inIpRange('10.0.0.0/8')"
      }
    },
    {
      "description": "Prevent accessing BigQuery datasets from outside UK business hours of 8am to 6pm, Monday to Friday",
      "deniedPrincipals": [
        "principalSet://goog/public:all"
      ],
      "deniedPermissions": [
        "bigquery.googleapis.com/*"
      ],
      "denialCondition": {
        "title": "Restrict access to UK Business Hours",
        "expression": "request.time.getDayOfWeek('Europe/London') >= 1 && request.time.getDayOfWeek('Europe/London') <= 5 && request.time.timeOfDay('Europe/London').between('08:00:00', '18:00:00')"
      }
    },
    {
      "description": "Prevent accessing Confidentially Tagged BigQuery datasets except for members of the confidential-data-admins group",
      "deniedPrincipals": [
        "principalSet://goog/public:all"
      ],
      "deniedPermissions": [
        "bigquery.googleapis.com/*"
      ],
      "exceptionPrincipals": [
        "principal://iam.googleapis.com/groups/confidential-data-admins@example.com"
      ],
      "denialCondition": {
        "title": "Resource is tagged as confidential",
        "expression": "resource.matchTag('YOUR_ORGANIZATION_ID/env/confidential')"
      }
    }
  ]
}
```

This example prevents anyone from deleting a Storage Bucket tagged as `production` unless they are members of the `storage-super-admins` group.

Create a file bucket-protection-ruleset.json and add the following JSON:

```json
{
  "description": "Deny deleting storage buckets to everyone except for the storage super admins group.",
  "deniedPrincipals": [
    "principalSet://goog/public:all"
  ],
  "exceptionPrincipals": [
    "principal://iam.googleapis.com/groups/storage-super-admins@example.com"
  ],
  "deniedPermissions": [
    "storage.googleapis.com/buckets.delete"
  ]
  "denialCondition": {
    "title": "Resource is tagged as production",
    "expression": "resource.matchTag('YOUR_ORGANIZATION_ID/env/production')"
  }
}
```

## Application

### Gcloud

Apply the rule with `gcloud`:

```bash
PROJECT_ID="<PROJECT-ID>"
gcloud iam policies create deny-confidential-bq-reads \
  --attachment-point=cloudresourcemanager.googleapis.com/projects/$PROJECT_ID \
  --kind=denyPolicy \
  --policy-file=deny-confidential-read-policy.json
```

### Terraform

Apply rules with terraform:
source: https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/iam_deny_policy

```
resource "google_iam_deny_policy" "example" {
  parent   = urlencode("cloudresourcemanager.googleapis.com/projects/${google_project.project.project_id}")
  name     = "my-deny-policy"
  display_name = "A deny rule"
  rules {
    description = "First rule"
    deny_rule {
      denied_principals = ["principalSet://goog/public:all"]
      denial_condition {
        title = "Some expr"
        expression = "!resource.matchTag('12345678/env', 'test')"
      }
      denied_permissions = ["cloudresourcemanager.googleapis.com/projects.update"]
    }
  }
  rules {
    description = "Second rule"
    deny_rule {
      denied_principals = ["principalSet://goog/public:all"]
      denial_condition {
        title = "Some expr"
        expression = "!resource.matchTag('12345678/env', 'test')"
      }
      denied_permissions = ["cloudresourcemanager.googleapis.com/projects.update"]
      exception_principals = ["principal://iam.googleapis.com/projects/-/serviceAccounts/${google_service_account.test-account.email}"]
    }
  }
}
```

## Auditing

Use Logs Explorer with the following query and look for the values in `protoPayload` within query responses.

```
resource.type="project"
protoPayload.serviceName="bigquery.googleapis.com"
protoPayload.authorizationInfo.denied="true"
```

Or from the Gcloud CLLI, use the following:

```
gcloud logging read '
  resource.type="project"
  AND protoPayload.serviceName="bigquery.googleapis.com"
  AND protoPayload.authorizationInfo.denied="true"
' --project=YOUR_PROJECT_ID --format="json"
```