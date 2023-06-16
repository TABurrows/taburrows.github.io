---
title: Storage Signed URLs
category: Google Cloud
order: 1
---
Storage Signed URLs

For Cloud Storage, Signed URLs allow access to Buckets without adding a User to an ACL or IAM:
- does not require users to have a Google Account in order to access Cloud Storage
- Temporary access with a timeout
- Anyone with the Signed URL has access

Creation:
- for Cloud Storage, can be created manually with gsutil or programmatically
- Google App Engine applications can use the App Engine Identity service

Example creation with gsutil:
- create a Service Account with the correct rights, this Service Account will be used to generate a signed URL
- create a key for the Service Account and store it in a file as .json
- use the gsutil signurl command to specifying the Service Account key.json and the object to which we want to allow access

```
gcloud iam service-accounts keys create ~/svc-acc-key.json --iam-account storage-admin-sa@thing-industries-central.iam.gserviceaccount.com

gsutil signurl -d 10m ~/svc-acc-key.json gs://secure-bucket-gsurl/protected-object.xml
```
