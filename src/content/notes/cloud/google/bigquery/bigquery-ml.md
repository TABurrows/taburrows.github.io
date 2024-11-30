---
title: "Google Cloud: BigQuery ML Fundamentals"
summary: "An overview of Google Cloud BigQuery ML"
tags: [ "Google Cloud", "BigQuery" ]
---



## Create ML Models

- Use the `CREATE MODEL` statement to create a binary logistic regression model 

- Use the `ML.EVALUATE` function to evaluate the model performance

- Use the `ML.PREDICT` function to make predictions from the model

- Use the `ML.TRAINING_INFO` function to get the results of model training


## Example Approach

Use linear regression to build a model of birth weight as a function of five factors:

- gestation weeks

- mother's age

- father's age

- mother's weight gain during pregnancy

- Apgar score

Use the following tools:

- BigQuery ML to prepare the linear regression input table 

```
CREATE OR REPLACE TABLE xxxxx.regression_input as
SELECT 
    weight_pounds,
    mother_age,
    father_age,
    gestation_weeks,
    weight_gain_pounds,
    apgar_5min
FROM
 `...`
WHERE
    weight_pounds IS NOT NULL,
    ...
```

- Python to query and manage data in BigQuery

```
gcloud store cp model_sparkml.py gs://bucket_name
gcloud dataproc jobs submit pyspark \
    gs://bucket_name/model_sparkml.py \
    --cluster=cluster-name \
    --region=region \
    --jars=gs://spark-lib/bigquery/spark-bigquery-with-dependencies_<scala_version>
```

- Apache Spark, to access the resulting linear regression table

- Spark ML, to build and evaluate the model

- Dataproc PySpark job, to invoke Spark ML functions