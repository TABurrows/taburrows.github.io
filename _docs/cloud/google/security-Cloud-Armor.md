---
title: Security - Cloud Armor
category: Google Cloud
order: 1
---
Security - Cloud Armor



GCP Cloud HTTP(S) Load Balancing is implemented at the edge of Google's network in Google's Points of Presence (POP) around the world.  User Traffic directed to an HTTP(S) LB enters the POP closest to the User and is then Load Balanced over Google's Global Network to the closest backend that has sufficient capacity available.

Cloud Armor IP allowlist/denylist enable you to restrict or allow access to your HTTP(S) Load Balancer at the Edge of the Google Cloud, as close as possible to the User and to malicious traffic.  This prevents malicious users or traffic from consuming resources or entering your VPC networks.

Example PoC: An HTTP Load Balancer with Global Backends can be configured - use a Stress Test on the Load Balancer and use Armor to denylist the Stress Test IP


Closely tied to LBs, so:
- Health Checks determine which instances of a load balancer can receive new connections
- Setup Firewall Rules to allow IPs from 130.211.0.0/22 and 35.191.0.0/16


Client -> Internet -> Cloud LB:
                        - Anycast IP
                        - Global Forwarding Rule
                        - Target Proxy
                        - URL Map
                        - Backend Service <-> Health Check
-> Firewall Rules -> Region


The HOST and PATH RULES will determine how your traffic will be directed.

Backend services direct incoming traffic to one or more attached backends.  Each backend is compose of an Instance Group and additionall serving capacity metadata.

You might get 404s or 502s until the Global HTTP LB has reached consistency - about 5 minutes.

Anycast IP means traffic is delivered to the closest region to the Client

You can use SIEGE to stress test/simulate load on an HTTP Load Balancer
```
sudo apt-get -y install siege

siege -c 150 -t120s http://10.0.0.1
```

Sample output:
```
Run siege -C to view the current settings in that file
{       "transactions":                        24729,
        "availability":                       100.00,
        "elapsed_time":                       119.07,
        "data_transferred":                     3.77,
        "response_time":                        0.66,
        "transaction_rate":                   207.68,
        "throughput":                           0.03,
        "concurrency":                        137.64,
        "successful_transactions":             24729,
        "failed_transactions":                     0,
        "longest_transaction":                 10.45,
        "shortest_transaction":                 0.03
}
```



Cloud Armor denylist:
```
Condition > Match:       <source_ip>
Action:                  Deny
Response Code:           403 (Forbidden)
Priority:                1000
```

### DDOS Protection

Standard Tier:
- Protected endpoint type:
  - Network load balancers
  - Protocol Forwarding
  - VMs with Public IP Addresses
- Forwarding Rule Enforcement

Advanced Tier = Standard Tier plus:
- Always-on attack monitoring and alerting
- Targeted attack mitigations
- Mitigation telemetry
```
gcloud compute security-policies create SECURITY_POLICY_NAME \
     --type CLOUD_ARMOR_NETWORK \
     --region REGION

gcloud compute security-policies update SECURITY_POLICY_NAME \
     --network-ddos-protection ADVANCED \
     --region REGION

# Or ADVANCED PREVIEW
gcloud beta compute security-policies update SECURITY_POLICY_NAME \
     --network-ddos-protection ADVANCED_PREVIEW \
     --region REGION

# For Standard tier
gcloud compute security-policies update SECURITY_POLICY_NAME \
    --network-ddos-protection STANDARD \
    --region REGION
```


Use preview mode
Preview mode lets you monitor the effects of advanced network DDoS protection without enforcing the mitigation.
'ADVANCED_PREVIEW'


Google Cloud Armor generates three types of event logs when mitigating DDoS attacks:
- Mitigation Started
- Mitigation Ongoing
- Mitigation completed



### WAF Rules

Google Cloud Armor preconfigured WAF rules are complex web application firewall (WAF) rules with dozens of signatures that are compiled from open source industry standards. Each signature corresponds to an attack detection rule in the ruleset. Google offers these rules as-is. The rules allow Google Cloud Armor to evaluate dozens of distinct traffic signatures by referring to conveniently named rules rather than requiring you to define each signature manually.

Examples:
- SQL Injection
- Cross-site scripting
- Local File inclusion
- Remote File inclustion

See: [ https://cloud.google.com/armor/docs/waf-rules ]




HTTP(S) load balancing supports both IPv4 and IPv6 addresses for client traffic. Client IPv6 requests are terminated at the global load balancing layer, then proxied over IPv4 to your backends.

