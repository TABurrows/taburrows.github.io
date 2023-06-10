---
title: Networks - Cloud NAT
category: Google Cloud
order: 1
---
Networks - Cloud NAT

When applied to a Subnet GCP automatically enables Private Google Access (and can't be disabled manually) for that range thus any VMs in that Subnet use Private Google Access to connecto to Google APIs and Services. With Private Google Access, Cloud NAT never performs NAT for traffic sent to the select external IP addresses of Google APIs and Services.

- Not dependent on a single, physical gateway device
- is a distributed, software-defined managed service

You configure a NAT Gateway on a Cloud Router which provides the Control Plane for NAT. Cloud Router contains the NAT configuration parameters.

The Cloud NAT gateway implements outbound NAT, but not inbound NAT. In other words, hosts outside of your VPC network can only respond to connections initiated by your instances; they cannot initiate their own, new connections to your instances via NAT.


Logging:
Advanced configurations -> Stackdriver logging 
Export Cloud NAT logs to Stackdriver

- No logging
- Translation and errors
- Translation only
- Errors only


Logs Explorer query:
```
resource.type="nat_gateway"
resource.labels.region="us-central1"
resource.labels.gateway_name="nat-config"
resource.labels.router_id="4815398893085330369"
```