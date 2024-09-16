---
title: BigQuery - ETL
category: Google Cloud
order: 1
---
Google Cloud BigQuery - Extraction Transform Load

It's common to build ETL pipeline in Apached Beam or Apache Spark, however it is possible to implement an ETL pipeline purely within BigQuery. Because BigQuery separates compute and storage, it is possible to run BigQuery SQL-queries against CSV or JSON or Avro files that are stored as-is on Google Cloud Storage - this capability is called FEDERATED QUERYING.

You can take advantage of FEDERATED QUERIES to extract the data using SQL queries against data stored in Cloud Storage, transform the data within those SQL queries and then materialize the results into a BigQuery native table.

If transformation is not required, BigQuery can directly ingest standard formats like CSV, JSON and AVRO into its Native Storage - an EL workflow.

Having data in Native Storage provices for the most efficient querying performance.