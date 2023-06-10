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


