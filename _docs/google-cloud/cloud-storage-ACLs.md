---
title: Cloud Storage
category: Google Cloud
order: 1
---
Cloud Storage


Members can be granted access to Cloud Storage at the Organizatin, Folder, Project or Bucket levels.

Any allocated permissions flow down from higher levels.

Consider using the principle of least privilege.

You can also define DENY RULES that prevent certain Principals from using certain Permissions, regardless of the Roles they've been granted.

You can 'Enforce Public Access Prevention' through the Organization Policy constraint.

You can use Access Control Lists ACLs to define who has access to individual buckets and objects, as well as what level of access they have - you apply ACLs to individual buckets and objects.

IAM and ACLs can work in tandem to grant access to buckets and objects. A user only needs a permission from either IAM  * or * an ACL to access a bucket or object. In most cases you should use IAM permissions instead of ACLs (use ACLs for when you need fine-grained control over individual Buckets of Objects).

to make an entire bucket public: 'Storage Object Viewer' Role to 'allUsers' Group on the bucket.

for individual objects in a bucket, to make them public grant the 'Reader' access to 'allUsers' on individual objects.