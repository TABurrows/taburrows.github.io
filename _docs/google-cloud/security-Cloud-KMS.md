---
title: Security - Cloud KMS
category: Google Cloud
order: 1
---
Security - Cloud KMS


Cloud KMS is integrated with Cloud IAM and Cloud Audit Logging so that you can manage permissions on individual keys and monitor how these are used.



Create a Keyring and Cryptokey
In order to encrypt the data, you need to create a KeyRing and a CryptoKey. KeyRings are useful for grouping keys. Keys can be grouped by environment (like test, staging, and prod) or by some other conceptual grouping:
```
gcloud kms keyrings create $KEYRING_NAME --location global

gcloud kms keys create $CRYPTOKEY_NAME --location global \
      --keyring $KEYRING_NAME \
      --purpose encryption
```

Note: CryptoKeys and KeyRings cannot be deleted in Cloud KMS


Base64 encoding allows binary data to be sent to the API as plaintext. This command works for images, videos, or any other kind of binary data.
Base64 Encode Input:
```
PLAINTEXT=$(cat 1. | base64 -w0)
```

Use the API to encrypt the Base64 Encoded Input:
```
curl -v "https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/global/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME:encrypt" \
  -d "{\"plaintext\":\"$PLAINTEXT\"}" \
  -H "Authorization:Bearer $(gcloud auth application-default print-access-token)"\
  -H "Content-Type: application/json"
```
Note: The encrypt action will return a different result each time even when using the same text and key.

Sample API CAll output:
```
...
< HTTP/2 200 
< content-type: application/json; charset=UTF-8
< vary: X-Origin
< vary: Referer
< vary: Origin,Accept-Encoding
< date: Mon, 03 Jul 2023 07:29:31 GMT
< server: ESF
< cache-control: private
< x-xss-protection: 0
< x-frame-options: SAMEORIGIN
< x-content-type-options: nosniff
< accept-ranges: none
< 
{
  "name": "projects/qwiklabs-gcp-03-272a26b7b2de/locations/global/keyRings/test/cryptoKeys/qwiklab/cryptoKeyVersions/1",
  "ciphertext": "CiQAvhwRlXVl3XIkDoKRozFGIOSjqnFQN2HFe7/Lm5LDbQ/JfVsSIQC8AcyVsMMBobiaNHDHJzoKRUDEOXKi9cDvGPUxzec76Q==",
  "ciphertextCrc32c": "4076244590",
  "protectionLevel": "SOFTWARE"
}
...
```

Saving the API Call output with 'jq':
```

curl -v "https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/global/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME:encrypt" \
  -d "{\"plaintext\":\"$PLAINTEXT\"}" \
  -H "Authorization:Bearer $(gcloud auth application-default print-access-token)"\
  -H "Content-Type:application/json" \
| jq .ciphertext -r > 1.encrypted

```

Verify with a decrypt call:
[ Note: Usually decryption is performed at the application layer. ]
```

curl -v "https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/global/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME:decrypt" \
  -d "{\"ciphertext\":\"$(cat 1.encrypted)\"}" \
  -H "Authorization:Bearer $(gcloud auth application-default print-access-token)"\
  -H "Content-Type:application/json" \
| jq .plaintext -r | base64 -d

```


Configure IAM permissions
In KMS, there are two major permissions to focus on. One permissions allows a user or service account to manage KMS resources, the other allows a user or service account to use keys to encrypt and decrypt data.

The permission to manage keys is cloudkms.admin, and allows anyone with the permission to create KeyRings and create, modify, disable, and destroy CryptoKeys. The permission to encrypt and decrypt is cloudkms.cryptoKeyEncrypterDecrypter, and is used to call the encrypt and decrypt API endpoints.

Assign the necessary 'cloudkms.admin' IAM permission:
```
gcloud kms keyrings add-iam-policy-binding $KEYRING_NAME \
    --location global \
    --member user:$USER_EMAIL \
    --role roles/cloudkms.admin
```

Since CryptoKeys belong to KeyRings, and KeyRings belong to Projects, a user with a specific role or permission at a higher level in that hierarchy inherits the same permissions on the child resources. For example, a user who has the role of Owner on a Project is also an Owner on all the KeyRings and CryptoKeys in that project. Similarly, if a user is granted the cloudkms.admin role on a KeyRing, they have the associated permissions on the CryptoKeys in that KeyRing.

Without the cloudkms.cryptoKeyEncrypterDecrypter permission, the authorized user will not be able to use the keys to encrypt or decrypt data.

To the 'roles/cloudkms.cryptoKeyEncrypterDecrypter' IAM permission:
```

gcloud kms keyrings add-iam-policy-binding $KEYRING_NAME \
    --location global \
    --member user:$USER_EMAIL \
    --role roles/cloudkms.cryptoKeyEncrypterDecrypter

```


To run a script to backup all files in a directory and upload to a Cloud Storage Bucket:
```

# download the files locally
gsutil -m cp -r gs://enron_emails/allen-p .

# call the api to encode and encrypt locally
MYDIR=allen-p
FILES=$(find $MYDIR -type f -not -name "*.encrypted")
for file in $FILES; do
  PLAINTEXT=$(cat $file | base64 -w0)
  curl -v "https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/global/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME:encrypt" \
    -d "{\"plaintext\":\"$PLAINTEXT\"}" \
    -H "Authorization:Bearer $(gcloud auth application-default print-access-token)" \
    -H "Content-Type:application/json" \
  | jq .ciphertext -r > $file.encrypted
done

# move ciphertext to Cloud Storage
gsutil -m cp allen-p/inbox/*.encrypted gs://${BUCKET_NAME}/allen-p/inbox


```
Note: Cloud Storage supports Server Side Encryption, which supports key rotation of your data and is the recommended way to encrypt data in Cloud Storage.