---
title: Database - Oracle
category: Google Cloud
order: 1
---
Database - Oracle


Use Bare Metal Solution as this is license compliant (license penalty: vCPU charged when using virtual machines = 2x license fee)

Problem: it would be expensive to rewrite the App not to use Oracle

Bare Metal Solution: compliant with Oracle's Hardware requirements

High Speed connectivity: 10Gbps - 100Gbps 

A high speed interconnect is set up between the partner and your Google region

- Customer brings license
- Customer manages and patches systems

Monthly pricing around $4000 per month for BMS, and around $250 per month for 10Gbps

Up to 400,000 IOPS is guaranteed

Encrypted in the data centre and in transit

Clients connect to the Oracle instance via a Google Managed VPC. A Network Peering is created between your Google Cloud VPC and the Google Managed VPC that provides access to the BMS servers at the Partner's location.

BMS servers themselves have no access to the Internet, nor do they have public IP addresses.  Use Cloud NAT + Cloud Router to connect these systems to the internet.

Striim is a common 3rd party data migration service

Oracle RAC provides automatic failover with a NetApp SAN shared - you can also deploy the RAC to multiple regions for increased robustness.


Use Oracle Data Guard for native database replication.