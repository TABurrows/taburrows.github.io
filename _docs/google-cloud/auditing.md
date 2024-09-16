---
title: Cloud Auditing
category: Google Cloud
order: 1
---
Cloud Auditing


Only Admin Auditing is enabled by default = modifications to the config or the metadata of a bucket or object

Data Access Logging is not recorded by default and must be turned on

Data Access Auditing = operations that modify objects or read a project, bucket or object

Logs are viewed in Cloud Logging - enabled via:
- make a bucket to hold the audit logs
- allow write access to the audit logs bucket
```
gsutil mb gs://thing-industries-storage-audit-logs
gsutil acl ch -g cloud-storage-analytics@google.com:W gs://thing-industries-storage-audit-logs
gsutil defacl set project-private gs://thing-industries-storage-audit-logs
gsutil logging set on -b gs://thing-industries-storage-audit-logs gs://thing-industries-bucket
```

To export the Logs to BigQuery for analysis:
- create a BigQuery Dataset
- Use a Load Job to copy log data into BigQuery Tables (two tables below: 'usage' and 'storage' with different inbuilt schemas)
```
bq mk storage_audit_logs
bq load --skip_leading_rows=1 storage_audit_logs.usage \
        gs://thing-industries-storage-audit-logs/thing-industries-storage-audit-logs_usage_2018_01_15_14_... \
        ./cloud_storage_usage_schema_v0.json
bq load --skip_leading_rows=1 storage_audit_logs.storage \
        gs://thing-industries-storage-audit-logs/thing-industries-storage-audit-logs_usage_2018_01_15_14_... \
        ./cloud_storage_storage_schema_v0.json
```

