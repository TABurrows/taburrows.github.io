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

With CSEK, GCP Services store only a cryptographic hash of the customer's key so that future requests can be validated against the hash - otherwise the key is purged from after use.


Create a keyring:
```
gcloud services enable cloudkms.googleapis.com
gcloud kms keyrings create $KEYRING_NAME --location us
```

Create a key on the above keyring:
```
gcloud kms keys create $CRYPTOKEY_NAME --location us \
--keyring $KEYRING_NAME --purpose encryption
```

View the current default key for a bucket:
```
gsutil kms encryption gs://$DEVSHELL_PROJECT_ID-kms
```

Give the Cloud Storage Service Account permission to use a key:
[ Crypto Key URL has form: projects/[PROJECT_STORING_KEYS]/locations/[LOCATION]/keyRings/[KEY_RING_NAME]/cryptoKeys/[KEY_NAME] ]
```
gsutil kms authorize -p $DEVSHELL_PROJECT_ID \
   -k projects/$DEVSHELL_PROJECT_ID/locations/us/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME
```

Set a Default Cryptographic Key for a bucket:
```
gsutil kms encryption -k \
projects/$DEVSHELL_PROJECT_ID/locations/us/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME \
gs://$DEVSHELL_PROJECT_ID-kms
```


To see a Crypto Key URL that is the default for a bucket:
```
gsutil kms encryption gs://$DEVSHELL_PROJECT_ID-kms
```


Encrypt a file with a specific Key:
```
gsutil -o "GSUtil:encryption_key=projects/$DEVSHELL_PROJECT_ID/locations/us/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME" \
cp file.txt gs://$DEVSHELL_PROJECT_ID-kms
```

Identify the key used to encrypt an object:
```
gsutil ls -L gs://$DEVSHELL_PROJECT_ID-kms/file.txt
```
[ The Crypto Key URL for the used key is under "KMS Key" value ]


In Cloud KMS, a Key Rotation is triggered by generating a new version of a key and marking that version as the PRIMARY VERSION. Each key as a designated Primary Version at any point in time, which Cloud KMS uses to encrypt data. After rotating the Primary Version however, previous versions of the key are not disabled or destroyed and remain available for decrypting data.

You set Cloud KMS to automatically rotate keys for you using the Cloud Console or the gcloud command-line tool.

When you rotate a key:

- A new version will be created and made the primary version.
- New data will be encrypted with the new version.
Older versions can be used to decrypt data. Data encrypted using older key versions will remain so unless explicitly re-encrypted.

* If you suspect unauthorized use of a key, you should re-encrypt the data protected by that key and then disable or schedule destruction of the prior key version. *


Destroying a key:
```
Do not make destruction decisions based on key usage information alone as this information may be delayed or incomplete. You cannot recover key versions after they have been destroyed.There are steps to take before destroying key versions.
When you schedule a key version for destruction, this immediately happens:
The version will be disabled
Data encrypted by this version will not be decryptable
Data signed by this version will not be verifiable
Per this key's settings, this version will be destroyed after 1 day.
```



