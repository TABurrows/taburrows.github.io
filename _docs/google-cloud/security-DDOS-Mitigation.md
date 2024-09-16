---
title: Security - DDOS Mitigation
category: Google Cloud
order: 1
---
Security - DDOS Mitigation

A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic from multiple sources.

botnets

A DDOS Attack in 2017:
    - botnet Dyn DDOS attack had a strength of around 1Tb/sec
    - Whole Internet has a bisection bandwidth of 200Tb/sec
    - Single Google Data Center has a bisection bandwith of 1300Tb/sec

On June 1, 2022, a Google Cloud Armor customer was targeted with a series of HTTPS DDoS attacks which peaked at 46 million requests per second. The largest Layer 7 DDoS attack reported to date - at least 76% larger than previously reported record. ( equiv to receiving all the daily Wikipedia traffic at once ). Cloud Armor blocked the attack ensuring the Customer's Service stayed online and continued serving their end-users.

Google Cloud DDOS mitigation techniques:
    Successful DDoS Mitigation Strategies have many Layers:
        - Load Balancing: using proxy-based load balancing to distribute load across resources
        - Attack Surface: reducing the attack surface by reducing externally facing resources
        - Internal Traffic: isolating internal traffic from the outside world by restricting access
        - API Management: monitor and manage APIs to spot and throttle DDoS attacks
        - CDN Offloading: offloading static content to a CDN to minimize impact
        - Specialized DDoS Protection: deploying applications that specifically provide deeper DDoS protection


Google's Central DoS mitigation Service:
    - if the system detects an attack, it can configure load balancers to drop or throttle traffic

An Attack Surface of a Software Environment is the sum of the different points where an Unauthorized User can try to enter data into or extract data from an environment. Keeping the Attack Surface as small as possible is a basic security measure.

Reducing an Attack Surface means reducing how much exposure your VMs have to the Internet.  You should host Compute Engine resources that require Network Communication on the same VPC Network. 