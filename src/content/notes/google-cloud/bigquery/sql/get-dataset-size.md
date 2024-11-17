---
title: "BigQuery SQL Dataset Size"
summary: "SQL: get the size of a dataset"
tags: [ "BigQuery", "Dataset" ]
---

To get the size of a BigQuery dataset:
```sql
select 
  sum(size_bytes)/pow(10,9) as size
from
  <DATASET_ID>.__TABLES__
```