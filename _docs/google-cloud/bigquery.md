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

List datasets:
```
bq ls
```

List datsets in JSON:
```
bq ls --format=prettyjson
```

Label filter datasets:
```
bq ls --filter labels.<key>:<value>
```

Show information about the datasets:
```
bq show <project_id>:<dataset>
```


Show information about the datasets in JSON:
```
bq show --format=prettyjson <project_id>:<dataset>
```

Load data from bucket:
```
bq load --autodetect $DEVSHELL_PROJ:source_data.events gs://cloud-training/gcpsec/labs/bq-authviews-source.csv
```

To create a view where a Session User can only see their own data:
```
SELECT
  *
FROM
  `qwiklabs-gcp-04-823283f36166.source_data.events`
WHERE
  email = SESSION_USER()
```
[ use the SESSION_USER() function ]