


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
- create read replicas in MULTIPLE REGIONS - one or more READ REPLICAs can be added for very large applications

