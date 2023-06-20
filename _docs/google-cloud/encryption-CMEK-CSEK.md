---
title: Encryption - CMEK and CSEK
category: Google Cloud
order: 1
---
Encryption - CMEK and CSEK

At Rest: all data is encrypted

Keyczar is the common cryptographic library

Cloud KMS uses an object hierarchy: a Key belongs to a Key Ring and a Key Ring resides in a given Location

A Key Ring is a grouping of Keys attached to a Project and created for Organizational Purposes

A common cryptographic library Keyczar is used to implement encryption consistently across almost all Google Cloud products. (eg. Cloud Storage, Compute Engine persistent disks, Cloud SQL DBs, Disk Snapshots, custom Compute Engine VM Images)


1. Data is first encrypted with a unique Data Encryption Key or DEK
2. then broken into Sub-File chunks (which can be up to serveral GBs in size)
3. each chunk is then encrypted at the Storage level with a Unique Key (reduces 'blast radius')
   (nb. two chunks will not have the same encryption key even if they are part of the same Cloud Storage object)
4. chunks are distributed across GCP Storage Infrastructure
5. then the Data Encryption Keys DEKs are "wrapped" by Key Encryption Keys KEKs, with the wrapped data encryption keys stored with the encrypted data

The KEKs are stored inside GCP's Central Cloud Key Management Service (Cloud KMS)

Cloud KMS-held Keys are also backed-up for disaster recovery purposes and are INDEFINITELY RECOVERABLE

Decryption:
Decrypting data requires the "unwrapped" Data Encryption Key DEK for a given data chunk

Standard rotation period for KEKs is 90 days

Up to 20 versions of KEKs can be stored in Cloud KMS (1800 days ~= 4.9 years)

Re-encryption of data is required at least once every 5 years (in practice it is much more frequent)

Customers can control the generation of keys, rotation periods and when to expire keys

Customer Managed Keys:
These are still stored in Cloud KMS but control of the Key's Lifecycle is given to the Customer

Key Rings can be GLOBAL, MULTI-REGIONAL or REGIONAL
Keys can be created only by attachment to a Key Ring

Cloud KMS supports both SYMMETRIC and ASYMMETRIC key types

To use Customer Managed Keys, select the key when creating VMs, Disks, Images or Storage Buckets

You will also need to Grant Permission to the Service Account to be able to use your Key

## Customer Supplied Keys

NOT stored in GCP. Customer is responsible for the Management and Rotation for ALL Keys. Key loss may make data unrecoverable.
The KEK must be supplied by the Customer whenever accessing storage resources or each time a disk is attached to an instance.

### Cloud External Key Manager (Cloud EKM)

Use keys that you manage within a supported External Key Management Partner. data can be protected in rest in supported CMEK Integration services or by calling the Cloud Key Management Service API directly.

Cloud EKM ( keys reside outside of Google and is never sent to Google ):
   - control of the location and distribution of Externally Managed Keys
   - externally managed keys are never cached or stored within Google Cloud ( Cloud EKM comms directly with the External Key Management Partner for each request )
   - access control: customer managed access to EKM keys (granting of Google Cloud project access is required:)
   - centralized key management

How it works:
- first create or use an existing key in a supported External Key Management Partner system (this key has a Unique URI or Key Path)
- Next, grant Google Cloud Project Access to use the key in the External Key Management Partner System.
- In the target Project, you then create a Cloud EKM key using the URI or Key Path for the externally Managed Key.
- In GCP, the key appears with other Cloud KMS and Cloud HS keys with PROTECTION LEVELs: *EXTERNAL* or *EXTERNAL_VPC*


