---
title: Encryption - via REST API
category: Google Cloud
order: 1
---
Encryption - via REST API

Encrypt data with the REST API:
The Cloud KMS service also provides a REST API to perform encryption and decryption. The content to be encrypted is specified as part of a JSON document in the REST request, and this content must be encoded using Base64 encoding. This JSON document has the following form:

{"plaintext":"Base64 encoded data to encrypt"}.

In this bonus section to the lab, you will manually invoke the REST api using curl commands to demonstrate the capability of the API.

This section assumes you still have the Cloud Shell session open and the following environment variables are defined:
KEYRING_NAME

CRYPTOKEY_1_NAME

CRYPTOKEY_2_NAME.

If these variables are no longer defined, go back to earlier in the lab and run the commands to create these variables.

Run the following command to encode some sample text as base64 and store it in a variable named PLAIN_TEXT:

PLAIN_TEXT=$(echo -n "Some text to be encrypted" | base64)
 
Echo the PLAIN_TEXT variable to verify the text was encoded:

echo $PLAIN_TEXT
 
You should see the base64-encoded text.

Use the REST API to encrypt the encoded text by calling the encrypt method of your key.

Supply the base64-encoded content in the plaintext field of the JSON for your request:

curl \
"https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/us/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_1_NAME:encrypt" \
-d "{\"plaintext\":\"$PLAIN_TEXT\"}" \
-H "Authorization:Bearer $(gcloud auth application-default \
print-access-token)" \
-H "Content-Type: application/json"
 
The response will be a JSON payload containing the encrypted text in the ciphertext field.

Note: The encrypted text can easily be extracted from the JSON response, and saved to a file by using the command-line utility jq. The response from the previous call can be piped into jq, which can parse out the ciphertext property and save to data1.encrypted.
Run the following command that repeats the encryption, but this time parses out the ciphertext property and saves it to the data1.encrypted file:

curl \
"https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/us/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_1_NAME:encrypt" \
-d "{\"plaintext\":\"$PLAIN_TEXT\"}" \
-H "Authorization:Bearer $(gcloud auth application-default \
print-access-token)" \
-H "Content-Type: application/json" \
| jq .ciphertext -r > data1.encrypted
 
View the contents of the data1.encrypted file with the following command:

more data1.encrypted
 
Note: The encrypted text can be decrypted by calling the decrypt method of your key. You must use the same key that was used to encrypt the content.
Run the following command to decrypt the contents in the data1.encrypted file and save it into the file named data1.decrypted:

curl -v \
"https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/us/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_1_NAME:decrypt" \
-d "{\"ciphertext\":\"$(cat data1.encrypted)\"}" \
-H "Authorization:Bearer $(gcloud auth application-default \
print-access-token)" \
-H "Content-Type:application/json" \
| jq .plaintext -r | base64 -d > data1.decrypted
 
View the contents of the data1.decrypted file with the following command:

more data1.decrypted
 
You have successfully used Cloud KMS keys.