---
title: Database - AlloyDB
category: Google Cloud
order: 1
---
Database - AlloyDB


AlloyDB for PostgreSQL is a fully managed PostgreSQL-compatible DB Service for demanding Enterprise DB workloads. AlloyDB combines the best of Google with one of the most popular open-source database engines, PostgreSQL, for superior performance, scale and availability.


### Create a Cluster

- Highly Avaiable: Multi-zone primary instance with no read pools. Optimized for availability.

- Highly available with read pool(s): Multi-zone primary instance with increased read capacity and on-demand horizontal scaling. Optimized for performance and availability.

- Basic: Single-zone primary instance with no read pools. No failover. Recommended for testing or use cases that favour lower cost over availability.

- Basic with read pool(s): Single-zone primary instance with increased read capacity and on-demand horizontal scaling. No failover.


Network: 
- default: Your network "default" requires a private services access connection. This connection enables your services to communicate exclusively by using internal IP addresses.
- peering-network:  Private Services Access Connection for network peering-network has been successfully created. You will now be able to use the same network across all your project's managed services.

First step:
Databases -> AlloyDB of PostgreSQL -> Clusters -> 'Create cluster'

- Cluster ID
- Password
- Network

nb. Private Services Access connection option may be required to access the AlloyDB cluster

Using gcloud:
```
gcloud beta alloydb clusters create gcloud-lab-cluster \
    --password=Change3Me \
    --network=peering-network \
    --region=Default Region \
    --project=Project ID


gcloud beta alloydb clusters list
```

### Delete a Cluster

Use the --force option to delete subordinate instances:
```
gcloud beta alloydb clusters delete gcloud-lab-cluster \
    --force \
    --region=Default Region \
    --project=Project ID

gcloud beta alloydb clusters list
```

### Create an Instance

As part of the Cluster Creation process:

Configure your primary instance:
- Define instance ID
- Define Machine type eg. 2 vCPU, 16 GB

nb. make a note of the 'Private IP' for the created instance as this may be the best connection method

Using gcloud:
```
gcloud beta alloydb instances create gcloud-lab-instance\
    --instance-type=PRIMARY \
    --cpu-count=2 \
    --region=Default Region  \
    --cluster=gcloud-lab-cluster \
    --project=Project ID

gcloud beta alloydb clusters list
```





### Create a Table

Use a PostgreSQL Client on a VM with the Private IP or configure the network to allow a remote PG Client access

```
export ALLOYDB=<ALLOYDB_ADDRESS>

echo $ALLOYDB  > alloydbip.txt 

psql -h $ALLOYDB -U postgres


# Then use SQL to create a TABLE
CREATE TABLE regions (
    region_id bigint NOT NULL,
    region_name varchar(25)
) ;
ALTER TABLE regions ADD PRIMARY KEY (region_id);


```


### Load Data

You can use an INSERT statement:
```
INSERT INTO <table> VALUES ( .... ), ( .... );
```

Or a .sql file:
```
# create a pg client session:
psql -h $ALLOYDB -U postgres

# load the data in data.sql file:
\i data.sql

# view the tables that are loaded into the db:
\dt

```


### Database Migration Service 

A Database Migration Service job with VPC peering for connectivity: AlloyDB requires the use of Private services access. This access is implemented as a VPC peering connection between your VPC network and the underlying Google Cloud VPC network where your AlloyDB resources reside. Migrating a database via Database Migration Service requires some preparation of the source database. 

After you create and run the migration job, you confirm that an initial copy of your database has been successfully migrated to your AlloyDB for PostgreSQL instance. Continuous migration jobs apply data updates from your source database to your AlloyDB for PostgreSQL instance as the source changes.

A connection profile stores information about the source database instance (e.g., stand-alone PostgreSQL) and is used by the Database Migration Service to migrate data from the source to your destination AlloyDB for PostgreSQL instance. After you create a connection profile, it can be reused across migration jobs.

In the Google Cloud Console, on the Navigation menu (console_nav_small.png), click Database Migration > Connection profiles.
- Source DB Engine eg Amazon RDS, PostgreSQL etc.


When you create a new migration job, you first define the source database instance using a previously created connection profile. Then you create a new destination database instance and configure connectivity between the source and destination instances.


### Flags

An instance can also be configured with the 'enable_pgaudit' database flag set. Pgaudit is a popular feature of PostgreSQL that provides detailed session and object audit logging via the standard logging facility. To fully enable pgaudit you must also enable the corresponding database extension.

In the Instances in your cluster section, select the <instance-name>, and then click Edit Primary. To add a database flag to your instance, click 'Add flag'.

To enable an extension:
```

psql -h $ALLOYDB -U postgres

\c postgres

select extname, extversion from pg_extension where extname = 'pgaudit';

CREATE EXTENSION IF NOT EXISTS PGAUDIT;

select extname, extversion from pg_extension where extname = 'pgaudit';

```



### Create a Read Pool Instance

One key feature of AlloyDB for PostgreSQL is the implementation of read pool instances. A read pool instance increases your cluster’s read capacity by aggregating nodes, which you can scale, enabling highly available reads.

You are not required to have any read pool instances in a cluster, but they provide better support for data analytics workloads than primary instances alone. Therefore they are the best choice for your data analytics needs.

To add a read pool instance click 'Add Read Pool' or 'Add Read Pool Instance' in the 'Instances' section of the cluster's 'Overview' page. Add a 'Node', 'Node machine type' and 'Node Count' and then click 'Create Read Pool'.

nb. the Private IP is in the same pool of addresses as the Primary Instance. This allows for the funnelling of read-specific queries to the read pool, enhancing cluster performance.


### Setup Backups

Automatic backups are configured by default when every AlloyDB cluster is created. You can however create backups on-demand.

Under 'Databases' click 'AlloyDB for PostgreSQL' then 'Backups'

AlloyDB checks that the source cluster is in the Ready state and then starts a long-running operation to perform the backup. The Backups page shows the backup with a status of In progress until the operation finshes. The speed varies based on the size of the instance.


### Monitoring

The AlloyDB Monitoring dashboard contains a great deal of information about the usage, size, and performance of the clusters and instances. The dashboard displays metrics of the resources that you use and lets you monitor any trends that result.


Use the Postgres tool 'pgbench' to generate a synthetic dataset and run a simulated workload:
```
# Pressure test on an instance
pgbench -h $ALLOYDB -U postgres -i -s 50 -F 90 -n postgres

select count (*) from pgbench_accounts;
```