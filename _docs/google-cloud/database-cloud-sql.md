---
title: Database - Cloud SQL
category: Google Cloud
order: 1
---
Database - Cloud SQL


Managed Services for MySQL, Postgresql and SQL Server.
- 96 Cores, 624 GB RAM and about 30 Terabytes of disk space maximum
    - Network capacity scales automatically with more vCPUs added to the instance
- can be configured to automativally Failover to another ZONE
- Bakcups and maintenance tasks like patching are automatically applied
    - you can enable automatic backups at creation time. These are done by creating snapshots of hte persistent disk being used by the DB. These backups can only be used to restore to ANOTHER Cloud SQL instance. If you want to mix destinations then you need to use the traditional SQL backup and restore commands for your DB.
    - Snapshots taken daily
    - You can enable point-in-time recovery

- secure by default
- A firewall allows access to the DB only from the PROJECT where the DB was created
    - you can add clients from other networks as required for your specific use case


Configure Client Applications to use the closest instance.

### High Availability

Createsa Failover DB in ANOTHER ZONE. If the main DB becomes unavailable then CLOUD SQL automatically switches to the failover until the main comes back online. It takes only about a minute for the system to perform the failover operation so downtime is minimized.

When configuring a database start small and scale up.

You can enable automatic storage increases wich will allocate more disk space on the fly.

Replicas are automatically synch-ed with the main.  Each READ REPLICA will be allocated a different IP address.
    - When configuring the APP, send all the WRITES to the MAIN and all the READS to the CLOSEST replica

A Firewall is installed with the Cloud SQL instance. By default, there is not access to the DB from outside the Project. You can authorize networks as needed using CIDR addressing.

#### Cloud SQL Migration Assistant

helps with on-prem DB, inter-project or 3rd Party Cloud migrations (currently only MySQL supported at time of writing)


#### Spanner

- Global
- Massively Scalable - horizontally by adding nodes, each node can accommodate approximately 2TBs of data
- Relational DB
- Google Managed
- Options for cross-region deployment

Creation:
- Name
- Location - Regional (99.99) or Multi-regional (99.999) (choice of multiple regions in Asia, EU or US)
- Number of Nodes

Can start as a single Node. 
Google recommends you keep CPU usage below 65% and add more nodes if this is exceeded.


#### Cloud SQL - GUI Options

- Enable Automatic Storage increases - allows you to start off with smaller disks and grow them as needed
- Can have a Private IP, Public IP or both
    A Private IP is most secure, however you have to configure or authorize clients to connect to that instance throught the Private IP using a PEERED NETWORK. Enabling Private IP creates a VPC PEERING between the Cloud SQL Database network and the Customer's VPC. So only VMs in the PEERED NETWORK can access the Cloud SQL Database.
    With Public IPs, a firewall is used to protect instances.
- Backups are disk snapshots - can only be restored to another Cloud SQL DB.
- Patch management is included in the service

- Highly available