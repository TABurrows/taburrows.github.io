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
nb. enabled on the Subnet


Private Service Connect:
Usage: Lets you use Internal IP Addresses to consume, produce and make services available
Connection: Connect to Googel, 3rd Party or your own Services by using Internal IP Addresses

nb. use a PRIVATE SERVICE CONNECT ENDPOINT to SERVICE ATTACHMENT then to a FORWARDING RULE = fast and grows with Org
nb. if you access Google APIs and Services wihtout using a Private Service Connect endpoint, the default route can serve as the path to Google APIs and Services

With PRIVATE SERVICE CONNECT and an HTTP(S) LOAD BALANCER, you can:
- Use a URL MAP to evaluate requests and route them to the correct VM or Service
- Use Customer-Managed TLS Certificates
- Enable Data Residency in-transit by connecting to Regional Endpoints for Google APIs from workloads in that SAME Region
- When the LB directs requests to the appropriate Network Endpoint Group in a Consumer Network. Each Endpoint is associated with a Service Attachment.
nb. unidirectional connectivity



Private Services Access:
Usage: Lets you use Internal IP Addresses to connect to specific Google and 3rd Party services by using VPC Network Peering
Connection: Connect Google and 3rd Party Services privately and directly to your VPC Network with VPC Network Peering
- Automates VPC Network peering


Serverless VPC Access:
Usage: Lets Cloud Run, App Engine Standard and Cloud Functions connect to the Internal IPv4 Addresses in a VPC Network
Connection: Connect serverless products to your VPC Network to access Google, 3rd Party or your own Services with Internal IP Addresses