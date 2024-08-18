---
title: Database - Strategies
category: Google Cloud
order: 1
---
Database - Strategies


### Lift and Shift

Involves picking up and moving VMs from one location into GCP. Might be good for monolithic Wordpress Apps etc. First create an image of the VM in the current environment, then copy to Cloud Storage and then import to Compute Engine. Google Cloud Images can be created from external virtual disks. Both VMWare .vmdk and Microsoft VHD file formats are supported.

```
aws ec2 export-image \
    --image-di ami-2345235643254 \
    --disk-image-format VMDK \
    --s3-export-location S3Bucket=s3-bucket-name-here,S3Prefix=exports/
```

A Compute Engine VM is create automatically to perform the conversion. If you're running a VM in another Cloud first create an image of that VM. Then you can export that image from the native Cloud providers format to a VM.  

- Check license agreements
- Make sure you can login to the VM
- For example, it's not possible to export a VM. For example images create from AWS marketplace cannot be exported.


Google Cloud Migrate for Compute Engine software will help you automate the migration of many VMs. Works with VMA, AWS and Azure Virtual Machines.  Machines are moved very quickly and then their data is streamed into Google Cloud before going live.


migVisor - assessment tool that helps identify dependencies and dependences. And it will recommend target DBs and service APIs.

striim - online migration tool.  Many different types of target and source databases.

### Backup and Restore

Traditional way to move a DB. Size of DB. Downtime tolerance. 
This method is simplest. 
For large DBs, use differential backups and restores after a full restore to minimize downtime.
Final step is to migrate connections.



### Live DB Migration

To migrate DBs to the Cloud with no downtime you can use DB replication.

Configure Main (old DB) and configure Replica (new DB)

Migrate large number of clients using a Service layer (rather than connect to the DB directly)

Blue/Green deployments - reduce the risk of a migration by allowing you to quickly revert back to the older service if a mistake is made.

Use a reverse Proxy or DNS to migrate client connections when ready.


### Optimize DBs for the Cloud

Once moved you should look for ways to Optimize DBs for the Cloud.

Microservice architecture are a good approach to breaking down large monolithic DBs into smaller DBs.  This allows different types of Services to use cheaper or more appropriate data stores.

Look for ways to break-up services that minimize dependencies between various microservices.

Binary Data -  Cloud Storage
Web app and session Data - Firestore
OLAP data - BigQuery
Transactional Data - Cloud SQL

Don't refactor applications all at once - Martin Fowler 'Strangler Facade'