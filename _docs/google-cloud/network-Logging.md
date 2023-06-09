---
title: Networks - Network Logging
category: Google Cloud
order: 1
---
Networks - Network Logging


Can be used to monitor and analyze network security status

Packet Mirroring clones the traffic of specified instances in your VPC Network

Mirroring occurs on the VM, not the network - as such, the mirroring consumes additional bandwidth on the hosts

Exports all traffic, not just traffic between sampling periods

Cloud Armor, Cloud CDN logs

VPC Flow logs - near realtime visibility (logs update every 5seconds)

No overhead for turning on VPC Flow Logs

Enable VPC Flow Logs per VPC Subnet
```
Field       Type    Description
src_ip      string  Source IP Address
src_port    int32   Source Port
dest_ip     string  Destination IP Address
dest_port   int32   Destination Port
protocol    int32   IANA Protocol number
```
also: Start/end time, bytes/packets sent, Instance details, VPC Details, Geographic Details


Recommendation: export traffic to BQ
