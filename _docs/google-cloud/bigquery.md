---
title: BigQuery
category: Google Cloud
order: 1
---
Google Cloud BigQuery

Consisting of:

- Datasets
- Tables
- External Tables
- Views
- Materialized Views
- Routines
- Connections
- Search Indexes

#### Datasets

Created via one of the following:

- Google Cloud console
- SQL Query from the SQL Workbench
- Using the bq command-line tool with bq mk
- Call the API method datasets.insert
- Using the Google Cloud Client SDK
- Clone an existing dataset

[ a dataset LOCATION cannot be changed after creation ]

[ Cloning a dataset requires both datasets to be in the same loction ]

##### Required IAM Permission:

```
bigquery.datasets.create
```
