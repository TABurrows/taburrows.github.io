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

### Instance Creation


```
gcloud spanner instances create my-sample-instance \
--config=regional-us-east4  \
--description="Sample Instance" \
--nodes=1
```


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

```
gcloud spanner databases create my-sample-db \
--instance=my-sample-instance
```


### Table Creation


```
CREATE TABLE Sample (
  SampleId INT64 NOT NULL,
  SampleName STRING(MAX)
) PRIMARY KEY (SampleId); 


CREATE TABLE Portfolio (
    PortfolioId INT64 NOT NULL,
    Name STRING(MAX),
    ShortName STRING(MAX),
    PortfolioInfo STRING(MAX)
) PRIMARY KEY (PortfolioId);

CREATE TABLE
  Category ( 
    CategoryId INT64 NOT NULL,
    PortfolioId INT64 NOT NULL,
    CategoryName STRING(MAX),
    PortfolioInfo STRING(MAX),
  FOREIGN KEY
    (PortfolioId)
  REFERENCES
    Portfolio (PortfolioId) )
PRIMARY KEY
  (CategoryId);


CREATE TABLE Product (
    ProductId	INT64 NOT NULL,
    CategoryId	INT64 NOT NULL,
    PortfolioId	INT64 NOT NULL,
    ProductName	STRING(MAX),
    ProductAssetCode STRING(25),
    ProductClass STRING(25),
    FOREIGN KEY (PortfolioId) REFERENCES Portfolio (PortfolioId),
    FOREIGN KEY (CategoryId) REFERENCES Category (CategoryId)
) PRIMARY KEY (ProductId);


CREATE TABLE Customer (
    CustomerId STRING(36) NOT NULL,
    Name STRING(MAX) NOT NULL,
    Location STRING(MAX) NOT NULL,
) PRIMARY KEY (CustomerId);


```


### Load Data

```
INSERT INTO
  Sample (SampleId, SampleName)
VALUES 
  (1, "Banking"); 


INSERT INTO
    Portfolio (PortfolioId, Name, ShortName, PortfolioInfo)
VALUES
    (1, "Banking", "Bnkg", "All Banking Business"),
    (2, "Asset Growth", "AsstGrwth", "All Asset Focused Products"),
    (3, "Insurance", "Insurance", "All Insurance Focused Products");



INSERT INTO
    Category (CategoryId, PortfolioId, CategoryName)
VALUES
    (1,1,"Cash"),
    (2,2,"Investments - Short Return"),
    (3,2,"Annuities"),
    (4,3,"Life Insurance");




INSERT INTO
    Product (ProductId, CategoryId, PortfolioId, ProductName, ProductAssetCode, ProductClass)
VALUES
    (1,1,1,"Checking Account","ChkAcct","Banking LOB"),
    (2,2,2,"Mutual Fund Consumer Goods","MFundCG","Investment LOB"),
    (3,3,2,"Annuity Early Retirement","AnnuFixed","Investment LOB"),
    (4,4,3,"Term Life Insurance","TermLife","Insurance LOB"),
    (5,1,1,"Savings Account","SavAcct","Banking LOB"),
    (6,1,1,"Personal Loan","PersLn","Banking LOB"),
    (7,1,1,"Auto Loan","AutLn","Banking LOB"),
    (8,4,3,"Permanent Life Insurance","PermLife","Insurance LOB"),
    (9,2,2,"US Savings Bonds","USSavBond","Investment LOB");




```


You can load complex datasets from Cloud Storage
```
# From a gsutil URL
gs://cloud-training/OCBL375/Customer_List_500.csv

# Or an HTTP URL
https://storage.googleapis.com/cloud-training/OCBL375/Customer_List_500.csv
```


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




Load data using Dataflow template jobs such as 'Text on Cloud Storage to Cloud Spanner'.



### Performing Backups

Can be done through the console, provide an expiration date for when the backup will no long be of any use in a restore



### Defining Schemas



### Updating Schemas (Update DDL)

Adding a new column to an existing table requires an update to your database schema. Cloud Spanner supports schema updates to a database while the database continues to serve traffic. Schema updates do not require taking the database offline and they do not lock entire tables or columns; you can continue reading and writing data to the database during the schema update.

You can use Client SDK libraries or gcloud:
```
gcloud spanner databases ddl update banking-ops-db --instance=banking-ops-instance --ddl='ALTER TABLE Category ADD COLUMN MarketingBudget INT64;'
```

For example:
```
gcloud spanner databases ddl update banking-ops-db --instance=banking-ops-instance --ddl='ALTER TABLE Category ADD COLUMN MarketingBudget INT64;'
```


### Secondary Indices

Suppose you wanted to fetch all rows of Categories that have CategoryNames values in a certain range. You could read all values from the CategoryName column using a SQL statement or a read call, and then discard the rows that don't meet the criteria, but doing this full table scan is expensive, especially for tables with a lot of rows. Instead you can speed up the retrieval of rows when searching by NON-PRIMARY key columns by creating a SECONDARY INDEX on the table.

Adding a secondary index to an existing table REQUIRES A SCHEMA UPDATE. Like other schema updates, Cloud Spanner supports adding an index while the database continues to serve traffic. Cloud Spanner populates the index with data (also known as a "BACKFILL") under the hood. Backfills might take several minutes to complete, but you don't have to take the database offline or avoid writing to certain tables or columns during this process.

You can create a SECONDARY INDEX with Python or SQL DDL: 
```
CREATE INDEX CategoryByCategoryName ON Categroy(CategoryName)
```

To read using the index, invoke a variation of the read() method with an index included:
```
    with database.snapshot() as snapshot:
        keyset = spanner.KeySet(all_=True)
        results = snapshot.read(
            table="Category",
            columns=("CategoryId", "CategoryName"),
            keyset=keyset,
            index="CategoryByCategoryName",
        )

        for row in results:
            print("CategoryId: {}, CategoryName: {}".format(*row))

```





Cloud Spanner's read interface does not support the ability to join an index with a data table to look up values that are NOT stored in the index.

To bypass this restriction, create an ALTERNATE DEFINITION of the CategoryByCategoryName index that stores a copy of MarketingBudget in the index.

Use the update_ddl() method of the Database class to add an index with a STORING clause in the CREATE INDEX:
```
def add_storing_index(instance_id, database_id):
    """Adds an storing index to the example database."""
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    operation = database.update_ddl(
        [
            "CREATE INDEX CategoryByCategoryName2 ON Category(CategoryName)"
            "STORING (MarketingBudget)"
        ]
    )

    print("Waiting for operation to complete...")
    operation.result(OPERATION_TIMEOUT_SECONDS)

    print("Added the CategoryByCategoryName2 index.")
```

Then running this:
```
python snippets.py banking-ops-instance --database-id  banking-ops-db add_storing_index
```
you can execute a read that fetches the CategoryId, CategoryName, and MarketingBudget columns while using the CategoryByCategoryName2 index





### Query Plans


A SQL query in Cloud Spanner is first compiled into an execution plan, then it is sent to an initial root server for execution. The root server is chosen so as to minimize the number of hops to reach the data being queried. The root server then:

- Initiates remote execution of subplans (if necessary)
- Waits for results from the remote executions
- Handles any remaining local execution steps such as aggregating results
- Returns results for the query

Remote servers that receive a subplan act as the "root" server for their subplan, following the same model as the top-most root server. The result is a tree of remote executions. Conceptually, query execution flows from top to bottom, and query results are returned from bottom to top.


### Aggregate Query

Cloud Spanner sends the execution plan to a root server that coordinates the query execution and performs the remote distribution of subplans.

This execution plan starts with a SERIALIZATION which orders all values returned. Then the plan completes an initial HASH AGGREGATE OPERATOR to preliminarily calculate results. Then a DISTRIBUTED UNION is executed which DISTRIBUTES SUBPLANS TO REMOTE SERVERS whose splits satisfy ProductId < 100. The DISTRIBUTED UNION sends results to a final hash aggregate operator. The aggregate operator performs the COUNT aggregation by ProductId and returns results to a serialize result operator. Finally a scan is conducted to order the results to be returned.

Explanation view has:
|
Serialize Result
|
Hash Aggregate
|
Distributed Union
|
Hash Aggregate
|
Filter Scan
|
Table Scan



### Co-located join queries

Interleaved tables are physically stored with their rows of related tables co-located. A join between interleaved tables is known as a CO-LOCATED JOIN. Co-located joins can offer performance benefits over joins that require indexes or back joins.

```
SELECT c.CategoryName, pr.ProductName
FROM Category AS c, Product AS pr
WHERE c.PortfolioId = pr.PortfolioId AND c.CategoryId = pr.CategoryId;
```

This execution plan starts with a distributed union, which distributes subplans to remote servers that have SPLITS of the table Category. Because Product is an interleaved table of Category, each remote server is able to execute the entire subplan on each remote server without requiring a join to a different server.

The subplans contain a CROSS APPLY. Each cross apply performs a table scan on table Category to retrieve PortfolioId, CategoryId, and CategoryName. The cross apply then maps output from the table scan to output from an index scan on index CategoryByCategoryName, subject to a filter of the PortfolioId in the index matching the PortfolioId from the table scan output. Each cross apply sends its results to a serialize result operator which serializes the CategoryName and ProductName data and returns results to the local distributed unions. The distributed union aggregates results from the local distributed unions and returns them as the query result.



