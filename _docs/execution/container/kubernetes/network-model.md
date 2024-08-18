---
title: Network Model
category: Kubernetes
order: 1
---
Kubernetes Network Model

### Service
Expose an application running in cluster behind a SINGLE OUTWARD-FACING ENDPOINT, even when the workload is split across multiple backends

### Ingress
HTTP(S) aware mechanism for mapping traffic to different backends according to API defined Rules

### Ingress Controllers
Control Ingress mechanisms - at least one ingress controller per cluster

### EndpointSlices
An API that helps the Service scale to handle large numbers of backends, updating backend health efficiently

### Network Policies
Control traffic flow at L3 & L4 by specifying rules for Traffic Flow within the Cluster, between Pods and Externally (Cluster must use a Network Plugin that supports NetworkPolicy enforcement)

### IPv4/IPv6 Dual-stack
Kubernetes supports Single-stack IPv4, Single-stack IPv6 or Dual-stack networking where both IP families are active

### Topology Aware Routing
Mechanism to keep Network traffic within the zone where it originated ( same-zone traffic between Pods is more reliable, performant in terms of both network latency and reliability, and more cost effective )

### Service Internal Traffic Policy
Keeps Network traffic within a Node's Pods - avoids a round trip via the Cluster Network ( more reliable, more performant in terms of both network latency and reliability and more cost effective )


- Service ClusterIP Allocation
- Topology-aware Traffic Routing with Topology Keys
- Networking on Windows