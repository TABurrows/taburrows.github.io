---
title: Networks - Subnets
category: Google Cloud
order: 1
---
Networks - Subnets




Example Create:
```
gcloud compute networks create managementnet --project=qwiklabs-gcp-02-9ebc0aa75678 --subnet-mode=custom --mtu=1460 --bgp-routing-mode=regional

gcloud compute networks subnets create managementsubnet-us --project=qwiklabs-gcp-02-9ebc0aa75678 --range=10.130.0.0/20 --stack-type=IPV4_ONLY --network=managementnet --region=us-east1

gcloud compute --project=qwiklabs-gcp-02-9ebc0aa75678 firewall-rules create managementnet-allow-icmp-ssh-rdp --direction=INGRESS --priority=1000 --network=managementnet --action=ALLOW --rules=tcp:22,tcp:3389,icmp --source-ranges=0.0.0.0/0

gcloud compute firewall-rules list --sort-by=NETWORK
```


Example 2 Create:
```
gcloud compute networks create vpc-prod-a --project=thing-industries-prod-a --subnet-mode=custom --mtu=1460 --bgp-routing-mode=regional 

gcloud compute networks subnets create vpc-prod-a-subnet-eu-w2 --project=thing-industries-prod-a --range=10.0.10.0/24 --stack-type=IPV4_ONLY --network=vpc-prod-a --region=europe-west2
```