---
title: Database - Cloud Spanner
category: Google Cloud
order: 1
---
Database - Cloud Spanner



A managed Apache Beam service

Dataflow is a Google Cloud service for streaming and batch data processing at large scale. Dataflow uses multiple workers to run data processing in parallel. The way in which data is processed is defined using pipelines that transform data from its origin (sources) to its destination (sinks).

There are connectors for Spanner etc. that allow you to connect a database as a source or a sink in Dataflow.

In order to load big amounts of data, you can use the serverless distributed power of Dataflow to read data from a source (for example, a CSV file in Google Cloud Storage) and load it into your Spanner database using a sink connector.

### Example with Cloud Spanner


Create the 'origin' bucket
```
gsutil mb gs://<Project ID>
touch emptyfile
gsutil cp emptyfile gs://<Project ID>/tmp/emptyfile
```

Ensure the proper APIs and permissions are set:
```
gcloud services disable dataflow.googleapis.com --force
gcloud services enable dataflow.googleapis.com

gcloud services disable dataflow.googleapis.com --force
gcloud services enable dataflow.googleapis.com
```

Console -> Analytics -> Dataflow -> Create Job From Template
( you can also create your own tailored pipelines using the Beam SDK )

Two types of template: Stream or Batch

provide a manifest.json to seed the import. The manifest file specifies the table, name and type of the columns (in the order that they appear in the CSV file), and the CSV file itself, which is also stored in a Google Cloud Storage bucket - create one if needed:
```
{
    "tables": [
        {
            "table_name": "Customer",
            "file_patterns": [
                "gs://cloud-training/OCBL372/Customer_List_500.csv"
            ],
            "columns": [
                {"column_name" : "CustomerId", "type_name" : "STRING" },
                {"column_name" : "Name", "type_name" : "STRING" },
                {"column_name" : "Location", "type_name" : "STRING" }
            ]
        }
    ]
}
```
