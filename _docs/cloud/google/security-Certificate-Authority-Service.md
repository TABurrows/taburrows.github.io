---
title: Security - Certificate-Authority-Service
category: Google Cloud
order: 1
---
Security - Certificate-Authority-Service



A globally scalable CA is hard to deploy and manage at scale

Traditional CAs are not well suited for microservices and DevOps

Google CAS:
- scalable
- highly avaialable
- Google Managed
- auditable
- simpler deployment
- simpler management

Allows IT/Sec teams to simplify and automate the deployment, management and security of Private Certificate Authorities while staying in control of Private Keys

Leverage descriptive RESTful APIs to acquire and manage certificates without a PKI expert.

Pay-as-you-go service model

Root CAs can be configured

Define granular and context-aware access controls and virtual security perimeters with IAM and VPC Service Controls 

CAS gives you the ability to:
- proetect the keys with a HSM
- Store the CA keys in Cloud HSM (FIPS 140-2 Level 3 validated)
- Audit user activity
- Obtain tamper-proof logs
- gain visibility into who did what, when and where with Cloud Audit Logs

- Supports 25 Queries per Second (QPS) per Instance
- Can issue millions of certificates
- comes with an enterprise-grade SLA