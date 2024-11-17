---
title: "BigQuery SQL Table Size"
summary: "SQL: get the size of a table"
tags: [ "BigQuery", "Dataset" ]
---

To get the size of a BigQuery table:

```sql
select 
  sum(size_bytes)/pow(10,9) as size
from
  <DATASET_ID>.__TABLES__
where 
  table_id = '<TABLE_NAME>'
```