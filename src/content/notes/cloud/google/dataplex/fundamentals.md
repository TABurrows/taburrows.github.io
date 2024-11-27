---
title: "Google Cloud: Dataplex Fundamentals"
summary: "The fundamentals of Google Cloud's Dataplex, the platform's Data Mesh solution"
tags: [ "Google Cloud", "Dataplex", "Fundamentals" ]
---


Dataplex, Google Cloud's Data Mesh solution, is an intelligent data fabric that enables the central discovery, management, monitoring and governing of data across data lakes, data warehouses and data marts to power analytics. A Data Mesh technical approach seeks to decentralize data ownership among domain data owners.

## Concepts

Data is not moved when managed by Dataplex only metadata is harvested when you add structured or unstructured data sources.  This metadata is registered in a secure, unified metastore from where it can be accessed by other Google Cloud tools such as Data Catalog and BigQuery.

The hierarchy of organizational components within Dataplex:
- Lakes
- Zones
- Assets


## API

The Service API:

```
gcloud services enable dataplex.googleapis.com 
```

## Lakes

The lake is highest organizational domain that often represents a specific data area or business unit. A common practice is to create lakes to which a specific group of users will need access.

```
gcloud dataplex lakes create $LAKE_NAME \
    --location=$REGION \
    --display-name=$LAKE_DISPLAY_NAME \
    --description=$LAKE_DESCRIPTION
```

## Zones

Zones are created within Lakes and are subdomains that can be used to further cateogrize data.  A zone might be created to categorize data by stage, usage or restrictions.

Two types:
- `Raw`: raw zones contain data in raw formats - such as files in Cloud Storage buckets - and are not subject to __strict type-checking__
- `Curated`: curated zones contain data that is __cleaned__, __formatted__, and ready for analytics workloads such as BigQuery datasets

To create a __Curated Zone__:

```
gcloud dataplex zones create $ZONE_NAME \
    --location=$REGION \
    --lake=ecommerce \
    --display-name=$ZONE_DISPLAY_NAME \
    --resource-location-type=SINGLE_REGION \
    --type=CURATED \
    --discovery-enabled \
    --discovery-schedule="0 * * * *"
```


## Assets

Assets are attached to Zones. For instance data stored in Cloud Storage buckets or BigQuery datasets can be attached as assets to zones within a Dataplex lake.

To create a BigQuery dataset called `orders`:
```
bq mk --location=$REGION --dataset orders
```

Then attached the newly create dataset as a Dataplex Asset:
```
gcloud dataplex assets create $ASSET_NAME \
    --location=$REGION \
    --lake=$LAKE_NAME \
    --zone=$ZONE_NAME \
    --display-name=$ASSET_DISPLAY_NAME \
    --resource-type=BIGQUERY_DATASET \
    --resource-name=projects/$PROJECT_ID/datasets/orders \
    --discovery-enabled
```


## Deletion

To delete a Dataplex Lake, you must first detach assets and then delete zones.

To detach an asset:
```
gcloud dataplex assets delete $ASSET_NAME \
    --location=$REGION \
    --zone=$ZONE_NAME \
    --lake=$LAKE_NAME
```

To delete a zone:
```
gcloud dataplex zones delete $ZON_NAME \
    --location=$REGION \
    --lake=$LAKE_NAME
```

To delete a lake:
```
gcloud dataplex lakes delect $LAKE_NAME \
    --location=$REGION
```


