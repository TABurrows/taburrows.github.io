---
title: "Database: ACID Transactions"
summary: "An overview of ACID Database Transactions"
tags: [ "Database", "ACID", "Transactions" ]
---

The acronym ACID stands for __Atomicity__, __Consistency__, __Isolation__ and __Durability__ and originated as a set or properties of database transactions that can guarantee data validity.


## Atomicity

Where a transaction is composed of several statements, atomicity guarantees that each transaction is treated as a single unit which either completely succeeds all statements or completely fails all statements.  This prevents partial updates in the event of unexpected failures.

## Consistency

Consistency ensures that any given transaction can only bring the database from one consistent state to another, preventing database corruption.  Any data written to the database  must be valid according to all defined rules such as constraints, cascades, triggers etc which are collectively referred to as database invariants.  Referential integrity is an example of a database invariant, one which guarantees the primary-key to foreign-key relationship.

## Isolation

Isolation ensures that concurrent execution of transactions leaves the database in the same state that would have been obtained had transactions been run sequentially.  Isolation is a form of concurrency control whereby multiple transactions arriving at the database can be executed without an incomplete transaction impacting any other.

## Durability

Durability ensures that once a transaction has been committed it will remain committed despite any power outage or other system crash.  This usually means that completed transactions are recorded on a durable, non-volatile medium.