---
title: Security - SSL Certificate
category: Google Cloud
order: 1
---
Security - SSL Certificate


You can create a private key, a certificate, and then a self-managed SSL certificate resource. Before you can create a Google Cloud SSL certificate resource, you must have a private key and certificate.

A Google Cloud SSL certificate includes both a private key and the certificate itself, both in PEM format.

Self-managed SSL certificates are certificates that you obtain, provision, and renew yourself. You use this resource to secure communication between clients and your load balancer, which you create in the next task.

Create a private key:
```
openssl genrsa -out PRIVATE_KEY_FILE 2048
```

Create a Certificate request:
1. Set the defaults in an ssl_config file:
```
[req]
default_bits = 2048
req_extensions = extension_requirements
distinguished_name = dn_requirements
prompt = no
[extension_requirements]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
[dn_requirements]
countryName = US
stateOrProvinceName = CA
localityName = Mountain View
0.organizationName = Cloud
organizationalUnitName = Example
commonName = Test
```

2. Create the Certificate Signing Request:
```
openssl req -new -key PRIVATE_KEY_FILE \
 -out CSR_FILE \
 -config ssl_config
```

3. Self-sign the CSR:
( when a CA signs your CSR, it uses its own Private Key to create a certificate )
```
openssl x509 -req \
 -signkey PRIVATE_KEY_FILE \
 -in CSR_FILE \
 -out CERTIFICATE_FILE.pem \
 -extfile ssl_config \
 -extensions extension_requirements \
 -days 365
```



Create a self-managed SSL certificate resource
Before you can create a Google Cloud SSL certificate resource, you must have a private key and certificate.

To create a global SSL certificate, use the gcloud compute ssl-certificates create command with the --global flag:

```
gcloud compute ssl-certificates create my-cert \
 --certificate=CERTIFICATE_FILE.pem \
 --private-key=PRIVATE_KEY_FILE \
 --global
```