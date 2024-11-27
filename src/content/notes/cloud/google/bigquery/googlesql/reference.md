---
title: "BigQuery: GoogleSQL Query Reference"
summary: "A reference for useful BigQuery GoogleSQL queries."
tags: [ "BigQuery", "SQL", "GoogleSQL", "Reference" ]
---


## Size

To get the size of a BigQuery dataset:

```sql
select 
  sum(size_bytes)/pow(10,9) as size
from
  <DATASET_ID>.__TABLES__
```


To get the size of a BigQuery table:

```sql
select 
  sum(size_bytes)/pow(10,9) as size
from
  <DATASET_ID>.__TABLES__
where 
  table_id = '<TABLE_NAME>'
```