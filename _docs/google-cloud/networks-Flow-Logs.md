---
title: Networks - VPC Flow Logs 
category: Google Cloud
order: 1
---
Networks - VPC Flow Logs


Turning on VPC flow logs doesn't affect performance, but some systems generate a large number of logs, which can increase costs. If you click on Configure logs you'll notice that you can modify the aggregation interval and sample rate. This allows you to trade off longer interval updates for lower data volume generation which lowers logging costs. For more information on this, refer to the log sampling and processing documentation.


To read a VPC Flow Log (enabled on the Subnet), so:
Logs Explorer Query:

resource.type="gce_subnetwork"
log_name="projects/qwiklabs-gcp-03-d4c7d854e6ea/logs/compute.googleapis.com%2Fvpc_flows"
92.233.240.174

'Run query'



To Log to BQ, choose 'Create Sink'
Sink destinations:
- Logging Bucket
- BigQuery Dataset
- Cloud Storage Bucket
- Cloud Pub/Sub Topic
- Splunk
- Other Project

Choose logs to sink:
```
resource.type="gce_subnetwork"
log_name="projects/qwiklabs-gcp-03-d4c7d854e6ea/logs/compute.googleapis.com%2Fvpc_flows"
```



Generate Traffic:
```
export MY_SERVER="34.134.195.128" && for ((i=1;i<=50;i++)); do curl $MY_SERVER; done
```

BQ Query for Flow Logs:
```
#standardSQL
SELECT
jsonPayload.src_vpc.vpc_name,
SUM(CAST(jsonPayload.bytes_sent AS INT64)) AS bytes,
jsonPayload.src_vpc.subnetwork_name,
jsonPayload.connection.src_ip,
jsonPayload.connection.src_port,
jsonPayload.connection.dest_ip,
jsonPayload.connection.dest_port,
jsonPayload.connection.protocol
FROM
`qwiklabs-gcp-03-d4c7d854e6ea.bq_vpcflows.compute_googleapis_com_vpc_flows_20230610`
GROUP BY
jsonPayload.src_vpc.vpc_name,
jsonPayload.src_vpc.subnetwork_name,
jsonPayload.connection.src_ip,
jsonPayload.connection.src_port,
jsonPayload.connection.dest_ip,
jsonPayload.connection.dest_port,
jsonPayload.connection.protocol
ORDER BY
bytes DESC
LIMIT
15
```

And:
```
#standardSQL
SELECT
jsonPayload.connection.src_ip,
jsonPayload.connection.dest_ip,
SUM(CAST(jsonPayload.bytes_sent AS INT64)) AS bytes,
jsonPayload.connection.dest_port,
jsonPayload.connection.protocol
FROM
`qwiklabs-gcp-03-d4c7d854e6ea.bq_vpcflows.compute_googleapis_com_vpc_flows_20230610`
WHERE jsonPayload.reporter = 'DEST'
GROUP BY
jsonPayload.connection.src_ip,
jsonPayload.connection.dest_ip,
jsonPayload.connection.dest_port,
jsonPayload.connection.protocol
ORDER BY
bytes DESC
LIMIT
15
```



To reduce costs, use Aggregation:

The purpose of each field is explained below.

Aggregation time interval: Sampled packets for a time interval are aggregated into a single log entry. This time interval can be 5 sec (default), 30 sec, 1 min, 5 min, 10 min, or 15 min.

Metadata annotations: By default, flow log entries are annotated with metadata information, such as the names of the source and destination VMs or the geographic region of external sources and destinations. This metadata annotation can be turned off to save storage space.

Log entry sampling: Before being written to the database, the number of logs can be sampled to reduce their number. By default, the log entry volume is scaled by 0.50 (50%), which means that half of entries are kept. You can set this from 1.0 (100%, all log entries are kept) to 0.0 (0%, no logs are kept).


Setting the aggregation level to 30 seconds can reduce your flow logs size by up to 83% compared to the default aggregation interval of 5 seconds. Configuring your flow log aggregation can seriously affect your traffic visibility and storage costs.


