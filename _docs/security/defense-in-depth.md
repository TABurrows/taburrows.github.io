---
title: Defense in Depth
category: Security
order: 1
---
#### Defense in Depth

Three principles to defense-in-depth securing of environments:

##### Secure your internet-facing services

- Close off access to your cloud resources from the Internet, unless absolutely necessary
- Leverage tools like App Amor for policy-based WAF/L7 protection
- Apply granular secuirty policies eg. customized access control on a per-app basis vs uniform L7 filtering. ( Policy and rule updates are possible via a REST API or CLI and can be rolled out globally in near real time)
- Turn on real-time monitoring, logging and alerting



##### Secure your VPC for private deployments

- Deploy VMs with only Private IP address ranges
- Deploy Kubernetes private clusters
- Serve Apps privately whenever possible ( use internal Load Balancer service to scale and serve your applications privately - for clients accessing applications and services within the VPC or from an on-prem private connection eg VPN / Interconnect )
- Access Managed Services privately
- Provide secure outbound internet connections with NAT Services such as Cloud NAT
- Use VPC Service Controls, to mitigate exfiltration risks by preventing your data from moving outside the boundaries of a trusted perimeter


##### Micro-segment access to your applications and services

- micro-segmentaion of VM-Base applications: control the comms of your VM-based applications by setting up Firewall Rules.  You can group your applications with tags or service accounts (preferred)
- micro-segmentation of Kubernetes based applications: you can control communication between your container-based applications by setting up network policies. You can group your applications based on namespaces or labels.
