---
title: Database - Migration
category: Google Cloud
order: 1
---
Database - Migration



Architect solutions for high availability, scalability and durability.


Approach to migration:
- evaluate on-premises db architecture and plan migrations




Google's methodology:
- Assess
- Plan
- Deploy
- Optimize



- test db migration project

- use logging and monitoring for dbs over time

DBs can often be the hardest part of an application to move

Design and architect the system so that the



Traditional DB <-> Application Architectural Patterns

Client-Server:
- tend to be highly normalized
- business logic tends to be provided by the DB server itself, rather than the client
- business rules are implemented using constraints on fields
- there are relationships implemented between tables, stored procedures are used as well as triggers
- clients connect directly to the database
- clients where intended to be as thin as possible
- the work of managing transactions and enforcing rules was the domain of the DB server itself where this logic was centrally located and shared by the clients
- Client-server dbs are fast and secure (often preferred architecture for many DBAs)

N-Tier/3-Tier:
- favoured by Programmers (especially Object-oriented programmers), the theory here is that Business Logic and Transaction management should be the domain of the Application rather than the DB
- much of the Business Logic therefore is pulled from the DB and placed into Application Code with the DB becoming more of a storage location
- the middle tier handles the COMPLEXITY and a 3-Tier/N-Tier
- few if any STORED PROCEDURES
- DB performance can suffer (especially when accessing MULTIPLE TALBES WITHIN A TRANSACTION)
- In this architecture, clients don't connect directly to the DB but instead connect through an intermediary application server

Service-Oriented Architecture:
- DBs sit behind a firewall and their functionality is encapsulated or hidden behind a service that was made available over the network
- Clients don't need to kno anything about the details of the DB
- Clients only connect to the service via HTTP(s) using this technology to pass data back and forth using a text-space format like XML or JSON



### DMS

Database Migration Service provides options for one-time and continuous jobs to migrate data to Cloud SQL using different connectivity options, including IP allowlists, VPC peering, and reverse SSH tunnels.



# Migration

A key aspect to migrating DBs is finding DEPENDENTS and DEPENDENCIES

## DEPENDENT
A DEPENDENT is something that RELIES on the DB or APPLICATION to function

## DEPENDENCY
A DEPENDENCY is something that the DB or APPLICATION RELIES on to function



Understanding the architecture of the DB you are trying to move is important.

Generally a CLIENT-SERVER Architecture is harder to move because there is more LOGIC provided by historic procedures that needs to be verified and tested - any error might break the Clients and more Dependent Applications tend to be connected directly to the Database.

N-Tier Applications have most of the Business Logic in the Application Code, so there is less testing required in the DB and there tend to be fewer Dependents.  Because the Clients connect to the Application and the Application connects to the DB.


Service-oriented Applications can be the easiest to move to the cloud because the DB is hidend behind the Service Layer.



Approach:
- Use UNIT and INTEGRATION testing for all STORED PROCEDURES and DATA MIGRATION CODE
- Make sure you have a DEPENDABLE Backup and Restore process in place
- Take an inventory of Client Applications


## Optimize DBs in the Cloud


Microservice Architectures - large applications are divided into smaller, simpler, independent services

Each Microservice should be responsible for its own data

Design services to minimize DEPENDENCIES between the services

Microservices should be loosely coupled (meaning one service can use another without understanding its details)

XML or JSON payloads

Different Microservices should be able to be deployed and versioned independently

Refactored or Combine services that are too tightly entangled


Use Cases:
- Use RELATIONAL DBs for OLTP
- noSQL for schema-less DB or when a higher degree of flexibility is needed
- Data Warehouse or Cloud Storage for Analytics and Object Storage

Two Managed relational DB Services:
- Cloud SQL (MS SQL Server, MySQL, Postgresql)
- Cloud Spanner

Memorystore provides a managed Redis DB Solution (key-value store)

Cloud BigTable is a MANAGED WIDE-COLUMN NoSQL DB (similar to Cassandra, great for TIMESERIES data)


### Failover Replicas

Deploy to different Zones - Main / Failover

To handle a large number of writes:
- Split the data into pieces (called shards)
- Use multiple nodes (servers) to process different shards

To handle high volumes of reads:
- Duplicate the data on multiple READ REPLICAS
- ONE Database handles the WRITES
- Replicas are Synchronised ASYNCHRONOUSLY

For Global Applications:
- create read replicas in MULTIPLE REGIONS - one or more READ REPLICAs can be added for very large applications:
    - the 'main' replica is responsible for the data, it synchronizes the data with remaining 'read' replicas
    - these 'read' replicas run the SELECT queries
- replicate across regions for lower latency to customers:
    - beware of latency when replicating
    - strong vs eventual consistency
(here requests from users are routed to the region geographically closest to them - automate this with Google's GLOBAL LOAD BALANCERS)
(here a 'main' will still handle writes and synchronize changes to the replicas)

If you use ASYNCHRONOUS REPLICATION across regions, the replicas can have stale data for a short period of time ie. eventual consistency (as opposed to immediate consistency)



#### Distributed DBs

Distributed databases use clusters of nodes and multiple shards to process high-volume writes.
If you split data into smaller pieces, you can use multiple servers to distribute the workload. As the workload increses, you can keep adding more nodes and more shards - thus providing a system that seems to be infinitely scalable. This is known as 'horizontal-scalling'/'scaling-out' where you make the DB server bigger to handle greater workloads.


#### Cloud Spanner Scaling

Cloud Spanner is a relational DB that scales horizontally by adding nodes.

#### Cloud SQL Scaling

Cloud SQL DBs scale vertically increasing MEMORY, vCPUs and Disk Space.





Planning:
- Application Inventory
- Database Dependencies
- App Catalogue


Making the business case:
- Value vs risk assessment



### Google's Implementation Methodology


There can be: Delays, bugs, downtime and cost overruns

Over time it is easy to lose track of Database Dependencies - then when things are switched, unexpected things fail.

1.) Assess - determine the requirements, dependencies to migrate apps to Google Cloud. You gain deep knowledge about the apps you want to migrate, understand your starting point.
    - build a comprehensive inventory of your apps:
        - dependencies of each app
        - services supporting your app infrastructure
        - Servers - physical or virtual
        - Physical appliances - such as network devices, firewalls and other dedicated hardware
        When you move the database changes to your dependencies will need to be made. This analysis is largely about identifying dependencies and dependence. It is important to catalogue applications that are dependent on a database. Care must be taken not to break those apps when the database is moved.
    - catalog the apps according to their properties and dependencies
    - train and educate your teams on Google Cloud
    - build an experiment and PoC on Google Cloud
    - calculate the total cost of ownership of the target environment
    - choose the workloads you want to migrate first
2.) Plan
    A good PoC should include: 
        - a broad set of use cases your apps need to support
        - defined performance, availability, failover and network requirements
        - the Google Cloud services you want to investigate
    Experimentation and testing that should validate assumptions, and demonstrate the value of Cloud to business leaders.
        - a comprehensive list of use cases
        - all the requirements for each use case such as performance and scalability requirements
        - expected consistency guarantees, fail over mechanisms and network requirements
        - a potential list of technologies and products that you want to investigate and test
    You should design PoCs and experiments to validate all the use cases on your list.
    Each experiment should have a precise validity context, scope, expected outputs and measurable business impact.
    A PoC will help you calculate the total cost of ownership fo a Cloud Solution.
    When you have a clear view of the Resources you need in the new environment, you can build a total cost of ownership model that lets you compare your cost on Google Cloud with the cost of your current environment. When building this cost model, you should consider both the costs for the hardware and software. Also all the operational cost of running your own data center such as power, cooling, maintenance and other support services. Its typically easier to reduce costs in an elastic environment like the Cloud than it is on-prem.
    Once you have an exhaustive view of you current environment, you need to complete your migration plan by choosing the initial order in which you want to migrate apps.
    The apps you migrate first are the ones that let's your teams build their knowledge and experience on Google Cloud. Greater Cloud exposure and experience from your team can lower the risk of complications during the deployment phase of your migration and make subsequent migrations easier and quicker. For this reason, choosing the right first-movers is crucial for a successful migration.
    You can pick one app or put many apps from across your apps matrix in your first movers list. Some criteria:
        - consider the business value of the app, but don't choose a mission-critical app where the risk is too great
        - consider the team responsible for development, deployment and operations fo the App
        - make sure you understand the number, type and scope of dependencies of the app
        - More dependencies can create a more difficult migration
        - be careful to understand the compliance and licensing requirements of the app
        - make sure the licenses allow you to run in the Cloud - don't violate any compliance rules
3.) Deploy
    Automate resource creation through scripting.
    Terraform is considered a First-Class citizen on Google Cloud
4.) Optimize
    Assess the current environment, set your optimization goals and then optimize for those goals. Re-assess.


### Database Migration

Five Steps to migrate a db:
- transfer the data 
    - Interconnect - increments of 10Gb
    - Transfer Appliance (you keep the encryption key, in case of theft or loss, data is secured)
    - Consider using Cloud Storage as a Staging Area
    - Storage Transfer Service can be used to transfer data from another CSP's buckets or from on-prem file servers
        - Transfer jobs are simple to create and can be run on a recurring schedule if needed
- resolve any data integration issues
    - For Data Transformations, use Cloud Dataflow (Apache Beam), Cloud Data Fusion (Apache Spark) or Cloud Composer (Apache Airflow)
    - 3rd party tools such as Striim
- validate the migration
    - use automated testing:
        - Unit tests verify each individual function, property, stored procedure, trigger etc.
        - Integration tests ensure that different components work together eg. clients can use services, services can use their databases
        - Regression tests ensure that the new platform is consistent with the older one, that new functionality does not break older code
        For lower-level tests, use an automation framework that works with your favourite programming language. There are also many third-party testing tools that you can use for system, security and black-box testing
- promote the new database
    - use SRE techniques to ensure that the new server works before the switchover
    With a Green/Blue deployment, you run both environments at the same time. You test the new environment before migrating workloads on to it. Then when ready switch environments where the Blue environment becomes Green and vice versa. With a Canary deployment you run both the old and new environments simultaneously, gradually migrating production requests to the new environment and monitoring for errors. If there are no errors increase the traffic to the new environment until all traffic has been moved.
- retire the old database


### Database Migration Approaches

Generally four choices, choose based on how much downtime can be tolerated and the complexity of the environment:
- Scheduled Maintenance
    For when you can tolerate some downtime. Define a time window when the database and applications will be unavailable. Migrate to the new Database, then migrate Client connections. The length of the window will depend on the amount of data you need to transfer. It might be possible to do an initial migration of historical data, then only load the diff during the window.
- Continuous Replication
    Use the built-in replication tools to synch old and new DBs. Then move client connections and then retire the old DB. Makes sense for on-prem Oracle to BMS.
- Split Reading and Writing
    Here the clients read and write to both the old and new databases for some amount of time. (requires code changes)
- Data Access Microservice
    All data access is encapsulated or hidden behind the serivce.  First migrate all client connections to the service, the service then handles migration from the old to new DB (making split reading and writing seamless to the client). Complex but is useful when you have many clients to migrate and can tolerate minimal or no downtime.




### Testing
- Unit
- Integration
- Regression


Three categories of testing a database migration/verifications:

- Structural - validates everything that should have been moved, has successfully been moved. eg. every table, procedure, index, foreign key, trigger, login etc. has been brought over and that the new environment is structurally the same as the original
    - Write automated Structural tests to ensure that all tables have been migrated
    - Write automated Structural tests to ensure that fields, data-types, links and constraints were migrated
    - Write automated Structural tests to ensure that all indexes have been created, Primary foreign key relationships were created and that primary and foreign keys match correctly in related tables
    - Write automated Structural tests to ensure that all stored procedures and and triggers were migrated and that all user logins were migrated

- Functional - goes to the next level and makes sure that all of the data has been migrated successfully. It ensures:
    - all of the views, stored procedures work as intended
    - that users can log in and see what they are supposed to see and not what they shouldn't
    Write Automated Functional tests to ensure that all data was migrated correctly, that stored procedures and triggers work as expected and user logins grant and deny access appropriately and that queries and views continue to return expected results

- Non-Functional - ensures the migrated database can perform well and can withstand peak usage scenarios. Loading stress tests will push the server to its limit to see whether it can handle the intended workload - and how far it will go before degraded service.  This will help determine resource allocation levels.


### Monitoring

Download and install the Monitoring Agent and Loggin Agent ( these are now combined into Ops Agent? )


### Tools
assess - plan - deploy - optimize

migVisor - helps find dependencies and dependents (first two steps)
striim - helps with the third (deploy step)
