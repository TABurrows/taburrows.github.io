---
title: "Google Cloud: Architecture Framework"
summary: "Google Cloud Architecture Framework provides recommendations to help architects, developers and administrators design and operate a cloud topology that's secure, efficient, resilient, high-performing and cost-effective."
tags: [ "Google Cloud", "Architecture", "Architecture Framework" ]
---

The Google Cloud Architecture Framework pillars:

__Operational Excellence__: efficiently deploy, operate, monitor and manager cloud workloads
__Security, Privacy and Compliance__: maximize the security of your data and workloads in the cloud, design for privacy, and align with regulatory requirements and standards
__Reliability__: design and operate resilient and highly available workloads in the cloud
__Cost Optimization__: maximize the business value of your investments in Google Cloud
__Performance Optimization__: design and tune your cloud resources for optimal performance

The Google Cloud Architecture Framework principles:

__Design for Change__: the needs of users, the team's goals in regards to the system and the system itself are constantly changing, so build a development and production process that enables teams to regularly deliver small changes and get fast feedback on those changes

__Document your Architecture__: documentation is especially important for correctly visualizing the architecture. Write documentation with use cases in mind.Version and log changes in a change history.

__Simplify your Design and use Fully Managed Services__: simplicity is crucial for design.  If you architecture is too complex to understand, it will be difficult to implement the design and manage it over time. Where feasible, use fully managed services to minimize the risks, time and effort associated with managing and maintaining baseline systems.

__Decouple your Architecture__: decoupling is a technique used to separate your applications and service components into smaller components that can operate indepenedently:
    - apply independent upgrades
    - enforce specific security controls
    - establish reliability goals for each subsystem
    - monitor health
    - granularly control performance and cost parameters

__Use a Stateless Architecture__: can increase both the reliability and scalability of your applications.  Stateful applications rely on various dependencies to perform tasks, such as local caching of data.  Stateful applications often require additional mechanisms to capture progress and restart gracefully. Stateless applications can perform tasks without significant local dependencies by using shared storage or cached services.  Applications can scale up quickly with minimum boot dependencies, can withstand hard restarts, have lower downtime and provide better performance for end users. 
