---
title: "Google Cloud: Datastore Fundamentals"
summary: "The fundamentals for using Google Cloud Datastore NoSQL document database."
tags: [ "Google Cloud", "Datastore", "NoSQL" ]
---

## Datastore Concepts

Data Objects are called __entities__

Entities are made up of one or more __properties__

Each entity has a __key__ that uniquely identifies it, composed of:
 - Namespace
 - Entity kind
 - Identifier (either a string or numeric ID)
 - Ancestor Path (optional)

Operations on one or more entities are called __transactions__ which are atomic

Kind: 'Customer'
    Entity:
        Key:
            Property
            Property
            
            

Datastore has two types of indexes:

Built-in Indexes
- Automatically pre-defined indexes for each property of each Entity Kind
- Are suitable for simple types of queries

Composite Indexes
- Index multiple property values for indexed entity
- Support complex queries
- Are defined in an index configuration file


#### Built-in Indexes
By default, an ASCENDING and DESCENDING INDEX (BUILT-IN INDEX) is pre-defined for each property of each ENTITY KIND.
These Single-Property Indexes are sufficient to perform many simple queries such as equality-only queries and simple inequality queries.
These Indexes are ASSUMED and do NOT appear in the indexes page of the Google Cloud console.

For more complex queries, you must manually define composite indexes.


#### Composite Indexes
Composites indexes are composed of Mulitple Properties.
If a property will NEVER be needed for a query, exclude the property from INDEXES.
Unnecessary property indexing will result in increased latency to achieve consistency and increase storage costs for indexes.
You should avoid having too many composite indexes
If you need to execute Ad Hoc Queries on large datasets without previously defined indexes, use BigQuery.
Do not index properties with monotonically increasing values such as a 'now' timestamp - this can lead to hotspots that impact Datastore latency for applications with High Read and Write rates.

Composite indexes are defined in the applications index configuration file: `index.yaml`. They are VIEWABLE but not editable through Cloud Console.

To deploy a composite index, modify the `index.yaml` configuration file to inclue all properties you want to index then run:
```shell
gcloud datastore indexes create
```

Depending on how much data is already in Datastore, creating the index may take a long time.

Queries that are run before the index has finished building will result in an exception.

When you change or remove an existing index from the index configuration, the original index is not deleted from Datastore automatically.

When you're sure that old indexes are no longer needed:
```shell
gcloud datastore indexes cleanup
```
which will delete all indexes for the production Datastore instance that are not managed in the local version of `index.yaml`.

You can check the status of indexes in the Cloud Console.

The table compares concepts in Datastore with standard relational database concepts.

One key difference between Datastore and a relational database is that Datastore is designed to automatically scale to handle very large datasets, allowing applications to maintain high-performance as they receive more traffic.

Datastore 'writes' scale by automatically distributing data as necessary.

Datastore 'reads' scale by only supporting queries whose performance scales with the size of the result set (as opposed to the data set)

A query whos result set contains 100 entities performs the same whether it searches over 100 entities or 1 million.

All queries are served by previously built indexes, so the types of queries that can be executed are more restrictive than those allowed on a relational database with SQL.

Datastore does not include support for joint operations, inequality filtering on mulitple properties or filtering on data based on the results of the subquery.

Unlike relational databases, Datastore is schema-less.

It doesn't require entities of the same kind to have a consistent property set.

If you wish to enforce a specific set of properties for a particular Kind, you must enfore that in your own application code.

| Concept | Datasore | Relational Database |
| --- | --- | --- |
| Category of an object | Kind | Table |
| One object | Entity | Row |
| Individual data for an object | Property | Field |
| Unique ID for an object | Key | Primary Key |



-----
Demo
-----


__note__ Datastore still has a requirement to start an App Engine Application

Nowadays there is no requirement to link to an App Engine instance.

You can check if there is an App Engine instance link with:
```shell
curl  --header "Authorization: Bearer $(gcloud auth print-access-token)" \
--header "Content-type: application/json" \
"https://firestore.googleapis.com/v1/projects/PROJECT_ID/databases/(default)"
```

An entity is roughly equivalent to a table in an RDBMS


#### Query Types

Query by kind

Possible filter values:
- is a date and time
- is a string
- is an integer
- is a floating poit number
- is a boolean
- is a key
- is null


Query by GQL

(Only for FIRESTORE IN DATASTORE mode)
Only these client libraries support GQL:
- C#
- Java
- PHP
- Ruby

Example
```
SELECT * FROM <kind>
```

```
GQL query error: Your Datastore does not have the composite index (developer-supplied) required for this query
```


If you want to do a less-than-or-equal for instance or query multiple properties we have to create a `custom composite index`.


A custom composite index is created with an `index.yaml` file only (console is read-only)

An example `index.yaml`:
```yaml
indexes:
- kind: <EntityName>
  properties:
  - name: firstName
    direction: asc
  - name: endYear
    direction: desc
```

Then  rebuild the indexes with:
```
gcloud datastore create-indexes index.yaml
```





## Design Considerations & Sharding

Design with these considerations:
- Use UTF-8 characters for:
    - Namespace names
    - Kind names
    - Property names
    - Key names
- Avoid forward slash (/) in:
    - Kind names
    - Custom key names

eg:
```yaml
# Good
key = client.key('Task', 'sample_task')
# Bad
key = client.key('Task', 'sample/task')
```




### Sharding

Sharding breaks up an entity into smaller pieces.

A single entity of Datastore should not be updated too rapidly eg more than once per second (the current maximum sustained write rate to a single entity.)

Avoid using Offsets in your queries and instead use `cursors`


#### Numeric IDs

For keys that use numeric IDs:
- Do not use a negative number
- Do not use the value 0
- if you wish to manually assign number IDs to your entities, get a block of IDs using the `allocateIds()` method
- Avoid monotonically increasing values (sequential numbering can lead to hot spots that impact Datastore latency)


### Performance

If you are writing more than once per second, then you can manually add N shards and write to those shards directly, then when you need a total read from all shards and add the amounts for a complete view.

Same with the read concurrency limits,  you can use replication if you need to read a portion of the key range at a highter rate than Datastore permists.  For N replicas this allows N times the rate of read.
  One example might be static config files.
  You could create N replicas of the same files and then you have N times performance.



## Replication, Query Types, Transactions, and Handling Errors

Use Batch Operations for your reads, writes and deletes instead of using single operations.

Batch operations allow you to perform multiple operations on multiple objects with the same overhead as a single operation.

If a transaction fails, try to roll back the transaction.

Having a rollback in place will minimize retry latency for concurrent requests of the same resources in a transaction.

If an exception occurs during a rollback, it is not necessary to retry the rollback operation.

When available, use asynchronous calls to minimize latency impact.

For example, if you have an application that needs two or more separate lookups or queries before it can render a response, it is faster to make the requests asynchronously so they can be performed in parallel.

If you need to access only the key from query results use a `keys-only query`.

Likewise, if you need to access only specific `properties` from an antity or you need to access only the `properties` that are included in the query filter, use a `projection query`.

Both keys-only and projection queries are lower latency and cost than retrieving entire entities.

Ancestor queries = return the parent-child relationships for stronly hierarchical data

#### Filters & Sorts

Use `cursors` instead of `offsets` which do not incur the costs of offsets whilst enjoying the same latency.  Queries are still retrieved in batches.

Do not use a negative number key id as they can interfere with sorting

Using a value of '0' for the id, will result in an automatic ID being created.

You can obtain a block of IDs for use with the `allocate IDs` method.

Sequential numbering can lead to hotspots that impact Datastore latency.


Transactions are guaranteed to be `atomic` which means that either all operations or no operations are applied

DAtastore will terminated a transaction if there is no activity for 60 seconds.  - max transaction time is 270 seconds.

A transax may fail when too many concurrent modifications are attempted on the same entity, the transaction exceeds a resource limit or the Datastore database encounters an internal error.

You cna receive errors in cases where transactions have been committed and eventually will be applied successfully.

Try to make transx `idempotenet` to retry 


| Error | Recommended Action |
| --- | --- |
| ALREADY_EXISTS | Do not retry without fixing the problemd |
| FAILED_PRECONDITION | |
| INVALID_ARGUMENT | |
| NOT_FOUND | |
| PERMISSION_DENIED | |
| UNAUTHENTICATED | |
| RESOURSE_EXHAUSTED | Fix quota if exceeded, else retry using exponential backoff |
| DEADLINE_EXCEEDED | Retry using exponential backoff |
| UNAVAILABLE | |
| INTERNAL | Do not retry this request more than once |
| ABORTED | For a non-transactional commit: |
| | - Retry the request or structure your entites to reduce CONTENTION |
| | For requests that are part of a transactional commit: |
| | - retry the entire transaction or structure you entities to reduce CONTENTION |











An Example firestore query to be run only in a trusted environment:
```javascript
db.collection("users").where("age", ">=", 13).select("name", "age").get()
```





Ramp up traffic gradually using the 500-50-5 rule:
- start with a base write rate of 500 writes per second
- increase it by 50 percent every 5 minutes


Distribute your writes across a key range




