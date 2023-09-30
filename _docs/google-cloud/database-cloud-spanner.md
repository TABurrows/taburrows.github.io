---
title: Database - Cloud Spanner
category: Google Cloud
order: 1
---
Database - Cloud Spanner


Cloud Spanner Instance = This is the project-level instance


Create a Provisioned Instance
Create a Database
Create Tables
Insert and Modify Data
Use the Google Cloud CLI with Cloud Spanner
Use Automation Tools with Cloud Spanner
Delete an Instance



Allocate compute capacity
Your compute capacity determines the amount of data throughput, queries per second (QPS), and storage limits in your instance. One node equals 1,000 processing units. Affects billing.


Choose a configuration
Determines where your nodes and data are located. Affects cost, performance, and replication. A multi-region configuration will select the default leader region for your leader replicas. You can change your leader region at any time with a DDL statement.


Storage cost depends on GB stored per month. Compute cost refers to the hourly charge of nodes or processing units in your instance.



Configuration details
Your instance configuration defines the location of your instance's storage and serving resources: all data and nodes will be located within the geographic areas defined by your configuration. Certain region configurations allow you to add more read replicas within them. Adding read replicas to a single regional configuration does not change the availability service level agreement (SLA). 

Check the configuration details and pricing carefully before you click save — your choice permanently affects cost, performance, and replication.


Performance guidelines
For optimal performance with this configuration, we recommend you place your critical compute resources (writes and latency-sensitive reads) within the same region.


### Database Creation

Define your schema (optional)
Add Spanner Data Definition Language SQL statements below. Separate statements with a semicolon.

Select database dialect
Choose between Google Standard SQL and PostgreSQL dialects for your Spanner database.
- Google Standard SQL
- PostgreSQL

Encryption:
- Google Managed
- CMEK

Tables are structured with rows, columns, and values, and they contain primary keys and indexes. Parent-child relationship between tables can be defined through table interleaving or foreign keys


### Capacity Planning

It is important to provision enough nodes to keep CPU utilization and storage utilization below the recommended maximum values. However, sometimes it is necessary to reduce the number of nodes.



### Loading Data

Insert data with DML:
```
gcloud spanner databases execute-sql banking-db --instance=banking-instance \
 --sql="INSERT INTO Customer (CustomerId, Name, Location) VALUES ('bdaaaa97-1b4b-4e58-b4ad-84030de92235', 'Richard Nelson', 'Ada Ohio')"
```

Insert data through a client library:
```
# python3 insert.py
from google.cloud import spanner
from google.cloud.spanner_v1 import param_types

INSTANCE_ID = "banking-instance"
DATABASE_ID = "banking-db"

spanner_client = spanner.Client()
instance = spanner_client.instance(INSTANCE_ID)
database = instance.database(DATABASE_ID)

def insert_customer(transaction):
    row_ct = transaction.execute_update(
        "INSERT INTO Customer (CustomerId, Name, Location)"
        "VALUES ('b2b4002d-7813-4551-b83b-366ef95f9273', 'Shana Underwood', 'Ely Iowa')"
    )
    print("{} record(s) inserted.".format(row_ct))

database.run_in_transaction(insert_customer)
```


Insert batch data through a client library:
```
# python3 batch_insert.py
from google.cloud import spanner
from google.cloud.spanner_v1 import param_types

INSTANCE_ID = "banking-instance"
DATABASE_ID = "banking-db"

spanner_client = spanner.Client()
instance = spanner_client.instance(INSTANCE_ID)
database = instance.database(DATABASE_ID)

with database.batch() as batch:
    batch.insert(
        table="Customer",
        columns=("CustomerId", "Name", "Location"),
        values=[
        ('edfc683f-bd87-4bab-9423-01d1b2307c0d', 'John Elkins', 'Roy Utah'),
        ('1f3842ca-4529-40ff-acdd-88e8a87eb404', 'Martin Madrid', 'Ames Iowa'),
        ('3320d98e-6437-4515-9e83-137f105f7fbc', 'Theresa Henderson', 'Anna Texas'),
        ('6b2b2774-add9-4881-8702-d179af0518d8', 'Norma Carter', 'Bend Oregon'),

        ],
    )

print("Rows inserted")
```
The batch method is more efficient, since it's run as a single request. Only one client-server round trip is needed, reducing latency.

However this is a very slow and resource consuming method to load data.




Load data using Dataflow



### Performing Backups

Can be done through the console, provide an expiration date for when the backup will no long be of any use in a restore



### Defining Schemas



### Query Plans


