---
title: Storage Signed URLs
category: Google Cloud
order: 1
---
Storage Signed URLs

Don't use PII in the Bucket or Object names (they are Global and Unique and are viewable by all)

If you need a lot of buckets, use GUIDs or an equivalent for bucket names, put retry logic in your code to handle name collisions, and keep a list to cross-reference your buckets.

Another option is to use buckets based on domain-name and then manage the bucket object names as sub-domains.

Before adding objects to a bucket, first check that the default object ACLs meet your requirements. (saves time updating ACLs for individual objects)

Use signed URLs for granting access to content securely for anyone without a Google Account

You may want to make public buckets readable, but there should never be a use case where you need to make a public bucket writable

Assign lifecycle management rules to a bucket eg downgrade storage class after 365 days - use this to move sensitive data once it is no longer needed

For BigQuey, leverage IAM Roles to ensure users are provided with ONLY the permissions that align with their job functions. At a min, separate who is allowed to create and manage datasets from those who can query the datasets and process the data.

BQ least privilege: leverage Authorized View to limit users to only a subset of data

Control storage costs and optimize usage by settting the Default Table Expiration for newly created tables in a dataset.  (if you set the property when the dataset is created, any table created in the dataset is deleted after the expiration period - if set after creation, only NEW tables are deleted after the expiration period)

In Cloud Storage, administrative operations that modify the configuration or metadata of a bucket, or object, is logged automatically. Data Access operations that modify objects or read a project, bucket, or object, is not recorded by default and must be configured.
