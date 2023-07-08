---
title: Networks - Network Tiers
category: Google Cloud
order: 1
---
Networks - Network Tiers

Premium vs Standard = Prioritize Performance vs Prioritize Cost Efficiency

Cold Potato routing limits distance travel and number of traceroute hops

Premium Tier:
Delivered over the GCP Global Network.
- High performance routing (Google's network)
- Unique to Google Cloud
- Global SLA
- Global Load Balancing, Cloud CDN
- Performance is main consideration

Premium tier delivers traffic over Google’s well-provisioned, low-latency, highly reliable global network. This network consists of an extensive global private fiber network with over 100 points of presence (POPs) across the globe.


Standard Tier:
Traffic between GCP and your end user is delivered over ISP Networks instead of Google's Global Network.
- Lower price and Lower performance than Premium
- Comparable to other Public Cloud Offerings
- No Global SLA
- Regional Load Balancing
- Cost is main consideration

Standard tier is a new, lower-cost offering. The network quality of this tier is comparable to the quality of other public cloud providers and regional network services, such as regional load balancing with one VIP per region, but lower than the quality of Premium tier.

Standard tier is priced lower than Premium because the traffic between Google Cloud and your end user (internet) is delivered over transit (ISP) networks instead of Google’s network.




### Standard Tier
Traffic enters and exits the Google network at a peering point closest to the Cloud region it's destined for or originated in.

### Premium Tier
Traffic traverses Google's high quality global backbone, entering and exiting at Google edge peering points closest to the user