---
title: Resource Hierarchy
category: Google Cloud
order: 1
---
Resource Hierarchy

Setup according to Enterprise Best Practices - Resource Hierarchy, Access, Networking and Centralized Logging

Step 5 of setting up your foundation [ to perform these steps User must be in the 'gcp-organization-admins' group (created in Step 2)]:

- GCP will create the project, service account and roles needed to download your configuration as Terraform or to deploy it directly from the console.
- Cloud Storage API and Cloud Config Manager API will be enabled
- the Roles created and assigned to the Service Account are:
  - Project Billing Manager [ at project level ]
  - Cloud Storage Admin [ on project ]
  - Service Usage Administrator [ on project ]
  - Storage Administrator [ on project ]

Types of Organization Hierarchies:

- Simple, Environment Oriented Hierarchy - recommended for Small companies with centralized environments:
  - Organization
    - Environments
- Simple, Team-Oriented Hierarchy - recommended for Small companies with autonomous teams:
  - Organization
    - Teams
      - Environments
- Environment-Oriented Hierarchy - recommended for Large companies with centralized environments:
  - Organization
    - Environments
      - Business Units ( eg. Departments )
        - Teams
- Business Unit-Oriented Hierarchy - recommended for Large companies with autonomous teams:
  - Organization
    - Business Units ( eg. Departments )
      - Teams
        - Environments


Google recommend three environment types [ you can use whatever name you like but the purpose stays the same ]:

- 'Production': represents your production folder that is later used for Granting Production-Related Access
- 'Non-Production': represents your non-production folder that is later used for Granting Non-Production-Related Access
- 'Development': represents your development folder that is later used for Granting Development-Related access

With the Simple, Team-Oriented Hierarchy we get:

- [ORGANIZATION] example.com
  - [FOLDER] Common
    - [PROJECT] vpc-host-prod
    - [PROJECT] vpc-host-nonprod
    - [PROJECT] logging
    - [PROJECT] monitoring-prod
    - [PROJECT] monitoring-nonprod
    - [PROJECT] monitoring-dev
  - [FOLDER] 'Finance'
    - [FOLDER] Production
    - [FOLDER] Non-Production
    - [FOLDER] Development
  - [FOLDER] 'Sales'
    - [FOLDER] Production
    - [FOLDER] Non-Production
    - [FOLDER] Development
  - [FOLDER] 'Marketing'
    - [FOLDER] Production
    - [FOLDER] Non-Production
    - [FOLDER] Development