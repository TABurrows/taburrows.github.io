---
title: Twelve Factor App
category: Development
order: 1
---
Twelve Factor App


Build SaaS apps that:
- use declarative formats for setup automation, to minimize time and cost for new developers joining the project
- have a clean contract with the underlying OS, offering maximum portability between execution environments
- are suitable for deployment on modern cloud platforms, obviating the need for servers and system administration
- minimize divergence between development and production, enabling continuous deployment for maximum agility
- can scale up without significant changes to tooling, architecture or development practices

* backing services: database, queue, memory cache etc)

"... paying particular attention to the dynamics of the organic growth of an app over time, the dynamics of collaboration between developers working on the app's codebase, and avoiding the cost of software erosion"

1. CODEBASE
One codebase tracked in revision control, many deploys

2. DEPENDENCIES
Explicitly declare and isolate dependencies

3. CONFIG
Store config in the environment

4. BACKING SERVICES
Treat backing services as attached resources

5. Build, release, run
Strictly separate build and run stages

6. Processes
Execute the app as one or more stateless processes

7. Port binding
Export services via port binding

8. Concurrency
Scale out via the process model

9. Disposability
Maximize robustness with fast startup and graceful shutdown

10. Dev/prod parity
Keep development, staging, and production as similar as possible

11. Logs
Treat logs as event streams

12. Admin processes
Run admin/management tasks as one-off processes