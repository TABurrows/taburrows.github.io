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