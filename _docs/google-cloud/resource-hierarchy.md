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
      - Business Units
        - Teams
- Business Unit-Oriented Hierarchy - recommended for Large companies with autonomous teams:
  - Organization
    - Business Units
      - Teams
        - Environments