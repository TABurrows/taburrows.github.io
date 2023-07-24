

GKE Secret Management

Enable Application Layer Encryption for Sensitive Data

- Application-layer Secrets Encryption provides an additional Layer of security for sensitive data, such as Secrets, stored in etcd
- Data in etcd, such as secrets, are encrypted locally with a DEK
- the DEK is also stored in etcd, but encrypted with a Key Encryption Key KEK in Cloud KMS, via a KMS Pluging


Use SECRET MANGER or Third-party tool like Hashicorp Vault to store and manage your GKE Secrets

