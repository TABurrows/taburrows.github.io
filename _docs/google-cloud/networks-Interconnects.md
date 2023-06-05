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
To order:
- LOA-CFA: Letter of Authorization and Connecting Facility Assignment (identifies the Connection Ports that Google has assigned for your Dedicated Interconnect connection - also grants permission for a vendor in a colo fac to make the connection)
- then, send the LOA-CFAs to your vendor
- Vendor notifies
- Create VLAN Attachments and establish BGP Sessions
- Confgure on-prem routers to establish BGP Session (you'll need VLAN ID, Interface IP Address and Peering IP Address provided by VLAN Attachment)

Partner;
- 50 Mbps - 50 Gbps per connection
- provided by a Partner/Service Provider who is connected to a Google Colo 
- access with Internal IP Addresses


Redundancy with Peer Edge Placement, place an Interconnect in more than one Edge Availability Domain
