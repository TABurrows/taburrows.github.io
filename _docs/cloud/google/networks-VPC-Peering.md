---
title: Networks - VPC Peering
category: Google Cloud
order: 1
---
Networks - Virtual Private Clouds Peering

Allows Private connectivity across 2 VPC Networks regardless of whether or not they belong to the same project or the same Org. 

Allows for the building of SaaS ecosystems in GCP, making services available privately across different VPC Networks within and across Orgs, allowing workloads to communicate in private space.

Useful for:
- Orgs with several Network Administrative Domains
- Orgs that want to Peer with other Orgs
( all in Private IP Address Spaces )

Advantages:
- Lower Network Latency than Public IP Networking
- Services are not exposed to Public Internet
- Using Internal IP addresses saves on GCP Egress Bandwidth costs (regular network pricing still applies to all traffic)

Project Names are unique across all of Google Cloud, so you do not need to specify the Organization when setting up Peering. (GCP will know the Org based on the Project Name)

In order to successfully establish VPC Network Peering, Admins on EACH of the Networks must SEPARATELY configure the Peering Association at each end

Create a Network:
```
gcloud compute networks create my-network-a --subnet-mode custom
```

Create a Subnet:
```
gcloud compute networks subnets create network-a-subnet --network my-network-a --range 10.0.0.0/16 --region <region>
```

Example create a VM:
```
gcloud compute instances create my-vm-a --zone <zone> --network my-network-a --subnet network-a-subnet --machine-type e2-small
```

Example enable connectivity:
```
gcloud compute firewall-rules create network-a-fw-rule --network my-network-a --allow tcp:22,icmp
```

Decentralized - Cross Org - Within Project

Allows Private RFC 1918 IP comms - no network latency, security or costs

VPC Networks remain Administratively separate

Subnet CIDRs cannot overlap

Transitive Peering not supported, only directly connected can communicate

To create, 2 PEERING RELATIONSHIPs must be created

Producer Network Admin must peer
Consumer Network Admin must peer
then VPC Network Peering Seession is activated

nb Compute Engine internal DNS names created in a network are not accessible to peered networks

You must know the remote VPC Network Name to complete one leg of the VPC Peering Process

You can configure Peering to export and import Custom Static and Dynamic Routes. ( Custom Static Routes that have a Next Hop of the Default Internet Gateway are excluded ) 