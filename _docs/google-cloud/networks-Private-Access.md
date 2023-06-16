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
Usage: Lets you use Google APIs and Services without giving your Google Cloud resources External IP Addresses
Connection: Connect to the Public IP addresses of Google APIs and Services through the Default Internet Gateway of the VPC Network
nb. enabled on the Subnet


Private Service Connect (Service Consumers, Service Producers):
Usage: Lets you use Internal IP Addresses to consume, produce and make services available
Connection: Connect to Google, 3rd Party or your own PUBLISHED Services by using Internal IP Addresses 
- traffic remains entirely within Google Cloud
- Service-Oriented Access - Producer Services are published through Load Balancers that expose a single IP Address to the Consumer VPC Network.
- Explicit Authorization - provides an authorization model that gives Consumers and Producers granular control
- Consumer -> Producer uses NAT = no IP Address Co-ordination required = No Shared Dependencies
- Line-rate Performance - NAT is performed directly on the Physical Host Machines that host the Consumer and Producer VMs


PRIVATE SERVICE CONNECT TYPES = Endpoint, Backend, Interface
PRIVATE SERVICE CONNECT supported GOOGLE SERVICES = Apigee, BeyondCorp Enterprise, Cloud Composer 2, Cloud SQL (soon), Dataproc Metastore, GKE Public Clusters (>1.23), Integration Connectors (soon)

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