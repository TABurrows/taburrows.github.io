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

To use Cloud Storage to host scripts for an external website, CORs must be configured to allow access from `storage.googleapis.com`.  It is also recommended that you use a specific bucket for this kind of access.


## gsutil

Note:
- `gsutil -D` will include OAuth2 refresh and access tokens in the output
- `gsutil --trace-token` will include OAuth2 tokens and the contents of any files accessed during the trace
- Customer-supplied encryption key information in `.boto` config is security-sensitive
- In a Production Environment, use an SA for gsutil

## Development

### Uploading

When building solutions using Cloud Storage, the best practices for `uploading` include:

- If using `XMLHttpRequests`:
    - do not close and re-open the connection
    - set reasonably long timeouts for upload traffic

- Make the request to create the resumable upload URL from the SAME region as the bucket and upload location

- Avoid breaking transfers into smaller chunks

- Avoid uploading content that has both:
    - `content-encoding: gzip`
    - `content-type: compressed`

### Validation

Data corruption can occur during upload and/or download:
- Noisy network links
- Memory errors on:
    - Client computer
    - Server computer
    - Routers along the path
- Software bugs

To validate data transferred:
- Use CRC32c Hash
    - is available for all cloud storage objects
    - can be computed using these libraries:
        - Boost for C++
        - crcmod for Python
        - digest-crc for Ruby
        - crc-32 for Node
        - crc32c.js for Browsers
    - `gcloud storage` commands automatically performs integrity checks on all uploads and downloads
- MD5 Hash:
    - is supported for non-composite objects
    - cannot be use for parital downloads

#### Client-Side

Issue a request to the new object's metadata, and then compare the reported hash value and delete the object in case of a mis-match


## Consistency

__Strongly Consistent__: when you perform an operation in Cloud Storage and receive a success response, the object is _immediately_ available for download and metadata operations.

The following operations are strongly consistent:

- `Read-after-write`
- `Read-after-metadata-update`
- `Read-after-delete`
- `Bucket listing`
- `Object listing`
- `Granting access to resources`


__Eventually Consistent__: when you perform an operation, it may take some time for the operations to take effect.

The following operations are strongly consistent:

- `Revoking access from objects`
- `Accessing publicly readable cached objects`

