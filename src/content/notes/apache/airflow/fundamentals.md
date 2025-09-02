---
title: "Apache: Airflow Fundamentals"
summary: "An overview of Apache Airflow's fundamental constructs."
tags: [ "Apache", "Airflow", "Composer", "Fundamentals" ]

---

Apache Airflow is the open source project behind Google Cloud's Cloud Composer managed service product.

## Components

- Kubernetes Engine + Cloud SQL 
- preinstalled logging and monitoring agents (Cloud Operations Logging and Monitoring)
- connectors for services in AWS, Azure, Databricks and Google Cloud

nb. if your data processing jobs are already written in Spark or Hadoop, you can use Dataproc instead, provision Hadoop clusters, run jobs and tear down clusters from within your workflows.

You can use `Airflow Operators` to train models on AI platform and to deploy trained models for surfing predictions



## Directed Acyclical Graphs

A DAG is a collection of the tasks you want to run represented by the nodes of the graph, organized in such a way that reflects the relationships and dependencies, represented by the edges of the graph.

Used in `continuous training pipelines`

### Scheduler

The Airflow Scheduler which is managed by Composer within a Kubernetes pod, will often create the DAG runs. However they can also be created by external triggers.

nb. there is a distinction between a `DAG` and a `DAG run`

### Imports

The scripts have five main sections: imports, arguments, instantiation of the DAG, task definitions, and dependencies.

`imports` Import Python dependencies required for the Workflow:
```python
from airflow import DAG
from airflow.models import Variable

from airflow.contrib.operators.bigquery_operator import BigQueryOperator
from airflow.contrib.operators.mlengine_operator import MLEngineVersionOperator
# Dummy operator, does nothing - useufl
from airflow.operators.dummy_operator import DummyOperator
from airflow.contrib.operators.pubsub_operator import PubSubPublishOperator
from airflow.operators.python_operator import PythonOperator
# Trigger operator - gives us more control over how dependencies are managed
from airflow.utils.trigger_rule import TriggerRule
```

Operators perform an .

Operators are usually, but not always, `atomic` which means that they can work alone and don't need to share resources with any other Operators.

The DAG will ensure the operators run in the correct order.

Three main types of Operators:
`Action`: they perform an action or tell the system to perform an action
`Transfer`: move data from one system to antoher eg. BigQuery or Cloud Storage
`Sensor`: that wait until a specific criteria has been met eg. a file's presence or content



Airflow will check these scripts once a second to look for updates (any code outside of the DAG will therefore be run every second too, so keep that in mind)

### Default Arguments

Often you will see the default arguments defined as a `dictionary`


### Tasks

Airflow provides `operators` for many common tasks, including:
`BashOperator` for executing a bash command
`PythonOperator` for calls to an arbitrary Python function

Airflow also provides operators for tasks on Google Cloud including operators for:
- BigQuery 
- Cloud Storage
- Dataproc
- Dataflow
- Cloud Build
- Vertex AI 

### Core Concepts

In Airflow, we use a Python SDK to define DAGs, tasks and dependencies as code.

A Task is a single node in a DAG and is defined in python.
