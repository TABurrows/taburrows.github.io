---
title: Networks - Traffic Management
category: Google Cloud
order: 1
---
Networks - Traffic Management

Provides enhanced features to route load balancer traffic based on a given set of criteria.

- Direct traffic to a backend based on HTTPS parameters
- Perform Request-based and Response-based actions:
  - redirects
  - header transformations
- Use Traffic Policies to fine-tune load balancing behaviour:
  - retry policies
  - request mirroring
  - cross-origin resource sharing (CORS)

[ nb. traffic features that are available can vary per LB. ]



URL MAP
Contains Rules that define the criteria to sue to Route incoming traffic to a Backend service.

Traffic management features are configured in a URL MAP.

The Load Balancer uses the URL Map to determine where to route incoming traffic.

Each URL in the URL MAP is composed of a Route Rule, a Rule Match and a Rule Action.

YAML File for pathMatchers:
defaultService: /path/to/default/service/web-backend-service
hostRules:
- hosts:
  - '*'
  pathMatcher: pathmap
name: lb-map
pathMatchers:
- defaultService: /path/to/default
  name: pathmap
  pathRules:
  - paths:
    - aShortRule
    service: /path/serviceA
  - paths:
    - aLongerRule
    service: /path/serviceB




Each URL MAP can contain either Simple or Advanced Rules or Both



Advanced Routing Mode 'routeAction'
- uses Route Rules instead of Path Rules
  
  empty string = match all
  weight = percent of traffic




YAML File for routeRules:
defaultService: /path/to/default/service/web-backend-service
hostRules:
- hosts:
  - '*'
  pathMatcher: routeMatcher1
name: lb-map
pathMatchers:
- defaultService: /path/to/default
  name: routeMatcher1
  - matchRules:
    - prefixMatch: ''
    routeAction:
        weightedBackendServices:
        - backendService: global/backendServices/service-a
          weight: 95
        - backendService: global/backendServices/service-b
          weight: 5

The top defaultService is used when there is no matching HOST rule

The pathMatchers defaultlService is used when there's a matching host but no matching Route Rule


nb. Wildcards asterisk is supported only after a forward slash
nb. Regexs are not suppported
