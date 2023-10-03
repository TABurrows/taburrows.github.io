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


To create an instance:
```
gcloud bigtable instances create sandiego \
--display-name="San Diego Traffic Sensors" \
--cluster-storage-type=SSD \
--cluster-config=id=sandiego-traffic-sensors-c1,zone=ZONE,nodes=1
```



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

cbt createtable <table-name> families="lane"
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


### Monitoring

To ensure the performance of your Bigtable instance, it is important to monitor the disk and CPU usage for each cluster in your instance. When the disk or CPU usage for a cluster exceeds the recommended thresholds, the cluster is not performant and may return errors for attempts to read or write data.

In this task, you use the Monitoring tab in Bigtable to review disk and CPU utilization for a cluster to ensure that the values are under the recommended thresholds.


### Monitor disk utilization

In Bigtable, the storage capacity of each cluster is determined by the storage type (SSD or HDD) and the number of nodes. As the amount of data in a cluster increases, Bigtable redistributes the data across the nodes in the cluster.

In general, we recommend that you utilize less than 70% of disk storage in a cluster. For latency-sensitive applications, we recommend that storage utilization per node remain below 60%. As your data grows, you can add more nodes to maintain low latency.

You can calculate the storage usage per node by dividing the storage utilization in bytes by the number of nodes in the cluster.

You may need to increase the number of nodes to satisfy the recommended levels for compute and storage. Bigtable provides options for either manual allocation or autoscaling of node count in a cluster.

When autoscaling is enabled for a cluster, Bigtable adjusts the number of nodes to meet the targets for CPU and storage utilization.

To apply AUTOSCALING:
```
gcloud bigtable clusters update sandiego-traffic-sensors-c1 \
--instance=sandiego \
--autoscaling-min-nodes=1 \
--autoscaling-max-nodes=3 \
--autoscaling-cpu-target=60
```


### Replication

If an instance has only one cluster, the durability and availability of your data are limited to the zone where that cluster is located. Replication can improve both durability and availability by storing separate copies of your data in multiple zones or regions and automatically failing over between clusters if needed.


### Backup and Restore

In Bigtable, you can back up the schema and data of a table, and then restore the backup to a new table as needed. While replication is intended to enable failover to different regions or zones, backups are intended to help recover data from application-level data corruption or operational errors such as accidental table deletions.

The cluster ID identifies the cluster from which the table is backed up and the cluster where the backup is stored.

In Bigtable, backups are not readable. To access the data in a backup, you can use the option for Restore on the Backups tab for Bigtable.



### Scenario
You have been hired as a database engineer for an ecommerce company that is interested in personalized sales. The company is interested in Bigtable to store online user interactions with products and personalized recommendations from machine learning models.

Create a new Bigtable instance:
```

gcloud bigtable instances create INSTANCE --display-name=DISPLAY_NAME
        [--async] [--cluster=CLUSTER]
        [--cluster-config=[id=ID,zone=ZONE,nodes=NODES,kms-key=KMS_KEY,
          autoscaling-min-nodes=AUTOSCALING_MIN_NODES,
          autoscaling-max-nodes=AUTOSCALING_MAX_NODES,
          autoscaling-cpu-target=AUTOSCALING_CPU_TARGET,
          autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET,...]]
        [--cluster-num-nodes=CLUSTER_NUM_NODES]
        [--cluster-storage-type=CLUSTER_STORAGE_TYPE; default="ssd"]
        [--cluster-zone=CLUSTER_ZONE]
        [--instance-type=INSTANCE_TYPE; default="PRODUCTION"]
        [GCLOUD_WIDE_FLAG ...]



gcloud bigtable instances create ecommerce-recommendations \
--display-name="E-Commerce Recommendations" \
--cluster-storage-type=SSD \
--cluster-config=id=ecommerce-recommendations-c1,zone=ZONE,nodes=1

```


Create a Bigtable table:
```

# First configure cbtrc
echo project=`gcloud config get-value project` >> ~/.cbtrc
echo instance=<instance-id> >> ~/.cbtrc

cbt createtable <table-id>


# Create column families
cbt createfamily <table-name> <column-family-name>

```

Create a data import job with Dataflow:
```

# Create temporary storage bucket location
gcloud storage buckets create gs://<project-name>

# Reset Dataflow APIs setting
gcloud services disable dataflow.googleapis.com --force
gcloud services enable dataflow.googleapis.com

# Console -> Analytics -> Dataflow -> Create Job From Template


# Log Request 
resource.type="dataflow_step"
resource.labels.job_id="2023-10-03_01_29_30-11412239558452042021"
logName="projects/qwiklabs-gcp-03-1594eab7ff4f/logs/dataflow.googleapis.com%2Fworker"
jsonPayload.work="2790839693022117026"


```




Sample sequence files:
Instance 'ecommerce-recommendations' on cluster 'ecommerce-recommendations-c1'

Table 'SessionHistory' with column families 'Sales' and 'Engagements':
Job 'import-sessions' uses sequence file:
gs://cloud-training/OCBL377/retail-engagements-sales-00000-of-00001

Table 'PersonalizedProducts' with column family 'Recommendations':
Job 'import-recommendations' uses sequence file:
gs://cloud-training/OCBL377/retail-recommendations-00000-of-00001