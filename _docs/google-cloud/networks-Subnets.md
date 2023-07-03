---
title: Networks - Subnets
category: Google Cloud
order: 1
---
Networks - Virtual Private Clouds




Example Create:
```
gcloud compute networks create managementnet --project=qwiklabs-gcp-02-9ebc0aa75678 --subnet-mode=custom --mtu=1460 --bgp-routing-mode=regional

gcloud compute networks subnets create managementsubnet-us --project=qwiklabs-gcp-02-9ebc0aa75678 --range=10.130.0.0/20 --stack-type=IPV4_ONLY --network=managementnet --region=us-east1
```