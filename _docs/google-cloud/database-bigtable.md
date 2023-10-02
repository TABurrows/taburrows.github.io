---
title: Database - BigTable
category: Google Cloud
order: 1
---
Database - BigTable


Bigtable is Google's fully managed, scalable NoSQL database service. Bigtable is ideal for storing large amounts of data in a key-value store and for use cases such as personalization, ad tech, financial tech, digital media, and Internet of Things (IoT). Bigtable supports high read and write throughput at low latency for fast access to large amounts of data for processing and analytics.

For personalization use cases, Bigtable can handle both high writes to store users' interactions with online products and high reads to provide these interactions to models that produce personalized recommendations.


In Bigtable, each row in a table has a unique identifier called a row key, and columns in a table are grouped by column family to organize related columns.

### Instances

An instance made up of a number of nodes allocated in a cluster along with a defined storage type (HDD, HDFS, Cloud Storage, SSD). 

A Cluster ID is generated.

Node Scaling Mode:
- Autoscaling
- Manual Allocation

An instance can have TABLES - a table is associated with a cluster id.

Recommended to use the Client SDK libraries to perform CRUD operations, and 'cbt' for debugging, evaluating and exploring.


To connect to an instance with 'cbt', first update the local '~/.cbtrc' file with the correct 'project id' and 'Bigtable instance ID'.
```
echo project=`gcloud config get-value project` >> ~/.cbtrc

# to get a list of cbt instances:
cbt listinstances

echo instance=<instance-id> >> ~/.cbtrc

# to see a list of tables
cbt ls
```


### Design a Schema and Row Key

To design a SCHEMA and ROW KEY in Bigtable, it is helpful to first answer key questions about the data that will be store:
- What does an individual row represent? (eg. an individual user, a unique sensor) - to identify row structure
- What will be the most common queries to this data? - to create a row key
- What values are collected for each row? - To identify the columns (referred to as COLUMN QUALIFIERS)
- Are there related columns that can be grouped or organized together? - To identify the column families


An example schema for an e-commerce sales timeseries dataset:
```
timestamp	    user_id	    preferred_color	    red_skirt   red_hat     orange_shoes	sale
1638940844260	1939	    green       		            seen    	seen	
1638940844260	2466	    blue            	seen    	seen		
1638940844260	1679	    blue		                    seen                   		blue_blouse#blue_jacket
1638940844260	2737	    blue    			                        seen            blue_dress#blue_jacket
1638940844260	582	        yellow                                      				yellow_skirt
```
nb. you would generally create a UUID for each user along with a timestamp as the key


A BEST PRACTICE for Bigtable is to store data with SIMILAR Schemas in the SAME TABLE, rather than separate tables. For example, all data for the online shopping sessions can be stored in one table for easy retrieval.


### Create a table

```
cbt createtable <table-name>
```

### Delete a table
```
cbt deletetable <table-name>
```

### Best Practices
Best practice for COLUMNS and COLUMN FAMILIES include:
- Use COLUMN QUALIFIERS as data, so that you do not repeat the value for each row (Treat COLUMN QUALIFIERS as data)
- Organize related COLUMNS in the same COLUMN FAMILY
- Choose short but meaningful names for the COLUMN FAMILIES (max size is 16KB)

- Create as many columns as you need. Bigtable is sparse and there's not space penalty for a column that is not sued in a row. You can have millions of columns in a table, so long as no row exceeds the maximum limit of 256MB per row.
- Avoid using too many columns in any single row. Although a table can have millions of columns, a ROW SHOULD NOT. A few factors contribute to this best practice:
    - it takes time for Bigtable to process each cell in a row
    - Each cell adds some overhead to the amount of data that's stored in your table and sent over the network

#### Rows
- Don't store more than 100MB in a single Row
- Keep All Information for an ENTITY in a SINGLE ROW (unless the row would be hundreds of MB in size)
- Store related ENTITIES in adjacent rows to make reads more efficient


#### Row Keys
- Design your row key based on the queries you will use to retrieve the data.
- Avoid row keys that start with a timestamp or sequential numeric IDs or that cause related data to not be grouped.
- Design row keys that start with a more common value (such as country) and end with a more granular value (such as city).
- Store multiple delimited values in each row key using human-readable string values (such as user ID followed by timestamp).


### Create COLUMN FAMILIES
```
# to create column families
cbt createfamily <table-name> <column-family-name>

# to list all the column families in a table
cbt ls <table-name>
# 'Family Name' 'GC Policy'
```



### Commands

```
# create a table
cbt createtable <table-id>

# get a list of tables
cbt ls


# create a column family
cbt createfamily <table-id> <column-family>

# get a list of column families
cbt ls <table-id>


# add data
cbt set test-sessions <row-key-prefix>#<row-key>#<row-key-suffix <column-family>:<column>=<column-value>


# to read stored data
cbt read <table-id>

# to see the first 5 rows of a table
cbt read <table-id> count=5

# query row by key returning 10 rows
cbt read <table-id> prefix=<row-prefix> count=10

# to query a range of rows
cbt read <table-id> start=<row-key> end=<row-key>

# to query a specific row
cbt lookup <table-id> <row-key>

# to query by column family identifiers
cbt read <table-id> count=5 columns="<column-family>:.*"

# to query by column returning 5 rows
cbt read <table-id> count=5 columns="<column-family>:<column>"

```