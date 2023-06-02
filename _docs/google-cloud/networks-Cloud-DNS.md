---
title: Networks - Cloud DNS
category: Google Cloud
order: 1
---
Networks - Cloud DNS

Cloud DNS is a policy engine service - for refining how resolution, allows for the creation, upating and management of millions of DNS Records without the burden of managing your own DNS Servers and Software

Managed via a simple UI in the Cloud Console, gcloud cli or via the API

Provides a flexible way to refine how your Org uses DNS

After you create the DNS records and artifacts needed for lookups, create Cloud DNS policies
Different policy types:
- SERVER POLICIES: apply Private DNS configuration to a VPC Network - you can apply one DNS Server Policy for each VPC Network
    - setup Hybrid deployments for DNS Resolution (eg. DNS forwarding zones can be created to an on-prem DNS Resolver with an Outbound Server Policy)
    - on-prem workloads can resolve names on Google Cloud (Inbound Server Policy)
    - Max one DNS Server Policy for each VPC Network
    - The one policy Per VPC Network - can specify Inbound DNS Forwarding, Outbound DNS Forwarding or both
  [ nb. Outbound Server Policy is one POSSIBLE method for implementing Outbound DNS Forwarding, Inbound DNS Server Policy refers to a single method ]
- RESPONSE POLICIES: enable the modification of the DNS Resolver by using defined rules - a Response Policy is a Cloud DNS Private Zone that contains RULES instead of DNS Records
  - You can use Resonse Policies to create a DNS Firewall by returning modified DNS Record results to clients (similar to DNS Response Policy Zones RPZ concepts)
  - Introduce Customized Rules in DNS Servers within your network that the DNS Resolver consults during lookups
  - If a Rule in the Response Policy affects the incoming query, it's processed, otherwise the lookup proceeds normall
  - Use ResponsePolicies API to create and modify
  - Response POlicies are separate from ManagedZones and cannot be managed by useing either the ManagedZone API or the RRSet API
- ROUTING POLICIES: steer traffic based on Geolocation or Weighted Round Robin
  - Weighted Round Robin Routing Policy lets you specify different weights per DNS Target
  - Used to support manual Active-Active or Active-Passive configurations
  - Can be used to split A/B or Blue-Green traffice based on the Traffic's Origin
  - Can be used with Internet Traffic, External Traffic or with Traffic originating within GCP and bound for Internal Load Balancers
  - GCP uses the region where queries enter GCP as the Source Geography
nb. Public Zones are used to provide Authoritative DNS resolution to clients on the Public Internet

nb. Google Public DNS 8.8.8.8 is a Public Internet recursive resolver



nb. Only ONE type of Routing Policy can be applied to a Resource Record Set at a time

nb. Nesting or otherwise combining routing policies is not supported

Created by specifying different weights per ResourceRecordSet for the resolution of domain names, routing policies ensure that traffic is distributed across multiple IP Addresses by resolving DNS Requests according to configured Weights.
WRR = Weighted Round Robin
GEO - Geolocation Routing Policy, applies the NEAREST MATCH for SOURCE LOCATION when the traffic SOURCE LOCATION doesn't match policy items exactly.