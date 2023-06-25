---
title: Security - Secret Manager
category: Google Cloud
order: 1
---
Security - Secret Manager


Remove "secret sprawl"

Leverage IAM to determine Secret access and what can be done to the Secret

Global Resource, Global Names and Global Replication - but optionally the data can be stored Regionally

Secrets can be versioned (unlimited) with each version having different Secret data

Only Project Owners have permission to create and access Secrets within their Project. Other Roles must explicitly be granted permissions through IAM. Use IAM to grant roles and permissions at the level of the Google Cloud Organization, Folder, Project or Secret.

Audit Loggingin: with Cloud Audit Logging ENABLED, every interaction with Secret Manager generates an Audit Entry.

You can ingest these logs into Anomaly Detection systems to spot abnormal access patterns and alert on possible security breaches.

Strong Encryption: Secret Manager manages server-side encryption keys on your behalf using the same hardened key management systems used for Google's own encrypted data, including strict key access controls and auditing.

Secret Manager encrypts user data at rest using AES-256.

There is no setup, configuration requirements, no need to modify the way you access a service, and no visible performance impact.

Secret data is automatically and transparently decrypted when accessed by an authorized user.  The Secret Manager API always communicates over a secure HTTP(s) connection.

Roles that control access to Secrets:
- Secret Manager Admin: can view, edit and access a secret (effectively full access to Administer Secret Manager resources)
- Secret Manager Secret Assessor: can only Access Secret data. Useful for Service Accounts or for situations when all that is needed is the ability to access the sensitive data held inside the secret.
- Secret Manager Viewer: can view the Secret's Metadata and its versions but cannot edit or access Secret Data

The Secret's data can not be modified, to replace create a new version

To prevent a Version from being used, DISABLE that Version

Secret Manager supports rotation scheduleds on Secrets. Secret Manager sends messages to Pub/Sub Topics configured on the Secret based on the provided Rotation Frequency and Rotation Time.

Admin Activity Access Audit Logs cannot be turned off or disabled and they do not count towards your Log Ingestion Quota - all activity that creates or changes a secret is logged here.

* Secret Manager does not write System Event Audit Logs *
Data Access Audit Logs are disabled by default.  Data Access Logs do count toward your log ingestion quota and therefore there is a cost involved. When Data Access Audit Logs are enabled, API Calls that read the Configuration or Metadata of resources, as well as user-driven API Calls that create, modify or read user-provided Resource Data. Data Access Audit Logs do not record the Data-Access Operations on Resources that are Publicly Shared. Inn other words, nothing is recorded for anything that is available to All Users or All Authenticated Users that can be accessed without logging into Google Cloud.
