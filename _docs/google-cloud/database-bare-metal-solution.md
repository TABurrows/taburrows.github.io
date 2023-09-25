---
title: Database - Bare Metal Solution
category: Google Cloud
order: 1
---
Database - Bare Metal Solution


Solution for Oracle DBs as they are not certified to run on Google Cloud as an official platform.

Bare Metal Solutions are servers provided by Partners to GCP (low-latency <2ms) near-by data centres (called Regional Extensions) with enterprise-grade security and reliability. Available in 9 regions. 8-10 weeks to provision. Connected via Google's High Speed Interconnect. Provisioned by the Partner and then a network is created by Google.  Connectivity is provided via a Bastion Host or Jump Server. All use latest Intel processors. Either Windows or Linux (Enterprise) is installed. You can choose the hi-speed bandwidth you need. A Netapp SAN is available if desired. Customer manages the machine after initial setup including licensing, security, patch management, software, application and their data. You can integrate Operations Services for Monitoring and Logging. Customers are also responsible for the administration of the Oracle DB including backups and encryption.


Intel Xeon Gold 3.2 GHz - 16 Cores - 384GB RAM
...
Intel Xeon Platinum 2.7 GHz - 112 Cores - 3072GB RAM


No limitations, these systems are managed as if owned by the Customer.

All Oracle autofill(?) features are supported including Real Application Clusters (RAC - currently unsupported in any managed cloud db service running Oracle).

Hardware is certified and optimized to run Oracle.

For managed Cloud services, Oracle charges for licenses by the vCPU.  There are two vCPUs per CPU code but when running on physical hardware, you pay by the Physical Code.  This is significantly cheaper compared to managed services.

#### Networking

You use VPC peering to connect your Google Cloud VPCs to BMS Servers.

When placing the order you can provide the Internal IP Address ranges you want in your Bare Metal Solution environment. By default Bare Metal Solution has no Internet Access. However you can set up an Internet Gateway. BMS Servers have no external IP Addresses.
