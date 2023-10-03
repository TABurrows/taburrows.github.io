---
title: Database - PostgreSQL
category: Google Cloud
order: 1
---
Database - PostgreSQL


### Migration

Overview:
- Prepare the source database for migration.
- Create a profile for a source connection to a PostgreSQL instance (e.g., stand-alone PostgreSQL).
- Configure connectivity between the source and destination database instances using VPC peering.
- Configure firewall and database access rules to allow access to the source database for migration.
- Create, run, and verify a continuous migration job using Database Migration Service.
- Promote the destination instance (Cloud SQL for PostgreSQL) to be a stand-alone database for reading and writing data.


- Verify that the Database Migration API is enabled
- Verify that the Service Networking API is enabled - The Service Networking API is required in order to be able to configure Cloud SQL to support VPC Peering and connections over a private ip-address


Add supporting features to the source database which are required in order for Database Migration Service to perform a migration:

- Installing and configuring the pglogical database extension.
- Configuring the stand-alone PostgreSQL database to allow access from Cloud Shell and Cloud SQL.
- Adding the pglogical database extension to the postgres, orders and gmemegen_db databases on the stand-alone server.
- Creating a migration_admin user (with Replication permissions) for database migration and granting the required permissions to schemata and relations to that user.