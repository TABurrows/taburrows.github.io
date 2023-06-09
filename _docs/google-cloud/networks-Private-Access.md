---
title: Networks - Private Access
category: Google Cloud
order: 1
---
Networks - Private Access

- Private Google Access
- Private Services Connect
- Serverless VPC Access



Private Google Access:
Usage: Lets you use Google APIs and Services withou giving your Google Cloud resources External IP Addresses
Connection: Connect to the Public IP addresses of Google APIs and Services through the Default Internet Gateway of the VPC Network


Private Service Connect:
Usage: Lets you use Internal IP Addresses to consume, produce and make services available
Connection: Connect to Googel, 3rd Party or your own Services by using Internal IP Addresses

nb. if you access Google APIs and Services wihtout using a Private Service Connect endpoint, the default route can serve as the path to Google APIs and Services


Private Services Access:
Usage: Lets you use Internal IP Addresses to connect to specific Google and 3rd Party services by using VPC Network Peering
Connection: Connect Google and 3rd Party Services privately and directly to your VPC Network with VPC Network Peering


Serverless VPC Access:
Usage: Lets Cloud Run, App Engine Standard and Cloud Functions connect to the Internal IPv4 Addresses in a VPC Network
Connection: Connect serverless products to your VPC Network to access Google, 3rd Party or your own Services with Internal IP Addresses