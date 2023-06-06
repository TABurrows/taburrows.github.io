---
title: Networks - Interconnect
category: Google Cloud
order: 1
---
Networks - Interconnect

Dedicated & Partner: Private connections directly to Google Networks

Dedicated 
- 10 Gbps or 100 Gbps per link - Eight 10Gbps Max or Two 100Gbps
- provided by Google at a Google Colocation facility
- access with Internal IP Addresses
To order/connect:
- LOA-CFA: Letter of Authorization and Connecting Facility Assignment (identifies the Connection Ports that Google has assigned for your Dedicated Interconnect connection - also grants permission for a vendor in a colo fac to make the connection)
- then, send the LOA-CFAs to your vendor
- Vendor notifies
- Create VLAN Attachments and establish BGP Sessions
- Confgure on-prem routers to establish BGP Session (you'll need VLAN ID, Interface IP Address and Peering IP Address provided by VLAN Attachment)

Partner;
- 50 Mbps - 50 Gbps per connection
- provided by a Partner/Service Provider who is connected to a Google Colo 
- access with Internal IP Addresses
To order/connect:
- SP will provide the connectivity for a VLAN Attachment
- create a VLAN Attachment - which creates a Pairing Key (unique, lets the SP identify & connect to the associated Cloud Router)
- SP uses this key to finish configuring your VLAN attachment
- Request a connection from your SP, SP will confirm
- in the VLAN Attachment, activate your connection
- finally configure the on-prem Routes to establish a BGP session with your Cloud Router


Redundancy with Peer Edge Placement, place an Interconnect in more than one Edge Availability Domain


nb. Each VLAN ATTACHMENT is a Logical Connection between your On-Premises Network and a Single Region in your VPC Network.
When creating a VLAN Attachment, specify a Cloud Router in the region that contains the Subnets that you want to reach.
The VLAN Attachment automatically allocates a VLAN ID and BGP Peering IP Address (APPIPA 169.254.x.x address)


For Layer 2 Connections:
- you must configure and establish a BGP Session between your Cloud Routers and On-premise Routers
- traffic passes through the SP Network to reach the VPC Network or on-prem Network

For Layer 3 Connections:
- traffic is passed to the SP network, the SP Provider establishes a BGP Session between your Cloud Routers and their on-prem routers for each VLAN Attachment
- here the SP establishes a BGP Session between the VPC Cloud Routers and the SP's Routers, whilst no BGP Session needs to established between the SP and the Customer