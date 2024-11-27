---
title: "Google Cloud Fundamentals"
summary: "An overview of the fundamental components of Google Cloud"
tags: [ "Google Cloud", "Fundamentals" ]
---


## *-as-a-Service

IaaS offerings provide raw compute, storage and network capabilities, organized virtually into resources that are similar to physical data centers.
Compute Engine is an example of a Google Cloud IaaS service.

PaaS offerings, in contrast, bind code to libraries that provide access to the infrastructure that the application needs.
App Engine is an example of a Google Cloud PaaS service.


## Cloud Storage

Google Cloud has storage options for structured, unstructured, transactional, and relational data.

Cloud Storage is Google’s object storage product.

Object storage is a computer data storage architecture that manages data as “objects” and not as a file and folder hierarchy (file storage), or as chunks of a disk (block storage).

These objects are stored in a packaged format which contains the binary form of the actual data itself, as well as relevant associated meta-data (such as date created, author, resource type, and permissions), and a globally unique identifier.

These unique keys are in the form of URLs, which means object storage interacts well with web technologies.

Data commonly stored as objects include video, pictures, and audio recordings.

If you choose to use versioning, Cloud Storage will keep a detailed history of modifications -- that is, overwrites or deletes -- of all objects contained in that bucket.

If you don’t turn on object versioning, by default new versions will always overwrite older versions.

### IAM and ACLs

Using IAM roles and, where needed, access control lists (ACLs), organizations can conform to security best practices, which require each user to have access and permissions to only the resources they need to do their jobs, and no more than that.

For most purposes, IAM is sufficient.

Roles are inherited from project to bucket to object.

If you need finer control, you can create access control lists.

Each access control list consists of two pieces of information.

The first is a scope, which defines who can access and perform an action.

This can be a specific user or group of users.

The second is a permission, which defines what actions can be performed, like read or write.

### Storage Classes

There are 4 primary Storage Classes:
- `Standard` for regular access more than once every 30 days
- `Nearline` for access at most once every 30 days
- `Coldline` for access at most once every 90 days
- `Archive` for access at most once every 365 days

There is a special `Autoclass` which automatically transitions objects to appropriate storage classes based on each object's access pattern.

### Data Transfer

- `gcloud` and `gstutil`
- `Storage Transfer Service` for scheduling and batch-managing data transfers from another Cloud Provider, from a different Cloud Storage Region or from an HTTPS Endpoint
- `Transfer Appliance` a rackmountable option to store up to 1 Petabyte of data to a local appliance which can then be shipped to Google


## Cloud SQL

Cloud SQL = Relational DBs based on MySQL, Postgresql and MS SQL Server

Limits:
- 128 processor cores
- 864 GB of RAM
- 64TB of storage

### Replication

Supports `Automatic Replication`  such as from Cloud SQL Primary Instance, to an External Primary Instance, and External MySQL instances.

### Backups

Supports `Managed Backups`, so backed-up data is securely stored and accessible if a restore is required.

The cost of an instance includes __Seven Backups__.

### Access Control

Cloud SQL includes a network firewall around each DB Instance.

### Connectivity

Cloud SQL interops well with `App Engine` using standard drivers like `Connector / J` for Java or `MySQLdb` for Python.

For Compute Engine, vm instances can be authorized to access Cloud SQL where the recommendation is that the Cloud SQL instance should be in the same zone as your virtual machine.

Other supported resources types:
- SQL Workbench
- Toad
- other external applications using stand MySQL drivers


## Spanner

- Utilizes `SQL`
- Scales Horizontally
- Strongly Consistent

Spanner is especially suited for applications that require a SQL relational database management system with joins and secondary indexes, built-in high availability, strong global consistency, and high numbers of input and output operations per second.

ie. tens of thousands of reads and writes per second or more.

## Firestore

Firestore is a flexible, horizontally scalable, NoSQL cloud `Document Store` database for mobile, web, and server development.

Documents can contain complex nested objects in addition to subcollections.

Each document contains a set of key-value pairs.

For example, a document to represent a user has the keys for the firstname and lastname with the associated values.

Firestore’s NoSQL queries can then be used to retrieve individual, specific documents or to retrieve all the documents in a collection that match your query parameters.

Queries can include multiple, chained filters and combine filtering and sorting options.

They're also indexed by default, so query performance is proportional to the size of the result set, not the dataset.

Firestore uses data synchronization to update data on any connected device.

However, it's also designed to make simple, one-time fetch queries efficiently.

It caches data that an app is actively using, so the app can write, read, listen to, and query data even if the device is offline.

When the device comes back online, Firestore synchronizes any local changes back to Firestore.

Firestore leverages Google Cloud’s powerful infrastructure: automatic multi-region data replication, strong consistency guarantees, atomic batch operations, and real transaction support.


## Bigtable

Bigtable is Google's NoSQL big data database service.

It's the same database that powers many core Google services, including Search, Analytics, Maps, and Gmail.

Bigtable is designed to handle massive workloads at consistent low latency and high throughput, so it's a great choice for both operational and analytical applications, including Internet of Things, user analytics, and financial data analysis.

When deciding which storage option is best, customers often choose Bigtable if: They’re working with more than 1TB of semi-structured or structured data.

Data is fast with high throughput, or it’s rapidly changing.

They’re working with NoSQL data.

This usually means transactions where strong relational semantics are not required.

Data is a time-series or has natural semantic ordering.

They’re working with big data, running asynchronous batch or synchronous real-time processing on the data.

Or they’re running machine learning algorithms on the data.

Bigtable can interact with other Google Cloud services and third-party clients.

Using APIs, data can be read from and written to Bigtable through a data service layer like Managed VMs, the HBase REST Server, or a Java Server using the HBase client.

Typically this is used to serve data to applications, dashboards, and data services.

Data can also be streamed in through a variety of popular stream processing frameworks like Dataflow Streaming, Spark Streaming, and Storm.

And if streaming is not an option, data can also be read from and written to Bigtable through batch processes like Hadoop MapReduce, Dataflow, or Spark.

Often, summarized or newly calculated data is written back to Bigtable or to a downstream database.



## Containers

The idea of a container is to give the independent scalability of workloads in PaaS and an abstraction layer of the OS and hardware in IaaS. Scales like PaaS but offers nearly the same flexibility as IaaS.

All that’s needed on each host is an OS kernel that supports containers and a container runtime.


### GKE

Simplifies Kubernetes for Google Cloud users.

Running a GKE cluster comes with the benefit of advanced cluster management features that Google Cloud provides.

With the `Autopilot mode`, which is recommended, GKE manages the underlying infrastructure such as node configuration, autoscaling, auto-upgrades, baseline security configurations, and baseline networking configuration.

With the `Standard mode`, you manage the underlying infrastructure, including configuring the individual nodes.

These include: 
- Google Cloud's load-balancing for Compute Engine instances
- Node pools to designate subsets of nodes within a cluster for additional flexibility
- Automatic scaling of your cluster's node instance count, Automatic upgrades for your cluster's node software
- Node auto-repair to maintain node health and availability, 
- logging and monitoring with Google Cloud Observability for visibility into your cluster



## Cloud Run

Cloud Run, built on `Knative`, which is a serverless managed compute platform that runs stateless containers via web requests or Pub/Sub events.

The Cloud Run developer workflow is a straightforward three-step process.

First, you write your application using your favorite programming language.

This application should start a server that listens for web requests.

Second, you build and package your application into a container image.

And third, the container image is pushed to Artifact Registry, where Cloud Run will deploy it.

Once you’ve deployed your container image, you’ll get a unique HTTPS URL back.

### Building

Cloud Run builds the source and packages the application into a container image  using Buildpacks - an open source project.

Then Cloud Run handles HTTPS serving for you.

You can use Cloud Run to run any binary, as long as it’s compiled for Linux sixty-four bit. This means you can use Cloud Run to run web applications written using popular languages, such as: Java, Python, Node.js, PHP, Go, and C++ - also run code written in less popular languages, such as: Cobol, Haskell, and Perl.


## AI: Prompt Engineering

Tips and techniques for the best results:

- Provide context
- Experiment with prompt formats
- Split complex tasks intor simpler ones
- Be clear and specific
- Refine your prompt
- Add clear syntax
- Specifying desired output
- Iterate, test, iterate

Example: 
"As an investor, identify and summarize the main points from the recent earnings reports"