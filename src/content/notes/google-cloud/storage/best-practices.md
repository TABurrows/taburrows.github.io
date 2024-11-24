---
title: "Google Cloud: Best Practices for Cloud Storage"
summary: "Best practices for using Google Cloud Storage."
tags: [ "Google Cloud", "Cloud Storage", "Buckets" ]
---


## Summaries

Multi-terabyte file exports or dumps of data from data analytics pipelines, Cloud Storage is the ideal solution for you.


Storage tier:
Standard
Nearline - 30 days
Coldline - 90 days
Archive - 365 days


Geo-redundancy if the data is stored in a `multi-region` or `dual-region`



Strongly consistent operations:
- Read-after-write
- Read-after-metadata-update
- Read-after-delete
- Bucket-listing
- Object-listing
- Granting access to resources

Strongly consistent: when you perform an operation in Cloud Storage and receive a success response, the object is immediately available for download and metadata operations.



Eventually consistent operations:
- Revoking access from objects
- Accessing publicly readable cached objects

Eventually consistent: when you perform an operation, it may take some time for the operations to take effect.


Composite Objects: combine upto 32 objects into one single new object:
- Dividing data and uploading each chunk into a distinct object, composing your final object and deleting any temporary objects
- Uploading data to a temporary new object, composing it with the object you want to append it to and deleting the temporary object

To compose an object from smaller chunks:
```
gcloud storage objects compose gs://example-bucket/component-obj-1 gs://example-bucket/component-obj-2 gs://example-bucket/composite-object
```



#### Enable CORs


Prevents:
- malicious behaviour
- useful and legitimate interactions between known origins