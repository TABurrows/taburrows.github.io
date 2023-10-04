---
title: Database - MySQL
category: Google Cloud
order: 1
---
Database - MySQL





Example simple interactions:
```
gcloud sql connect myinstance --user=root


CREATE DATABASE guestbook;


USE guestbook;
CREATE TABLE entries (guestName VARCHAR(255), content VARCHAR(255),
    entryID INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(entryID));
    INSERT INTO entries (guestName, content) values ("first guest", "I got here!");
INSERT INTO entries (guestName, content) values ("second guest", "Me too!");


SELECT * FROM entries;

```


### Database Migration Service

Database Migration Service provides a high-fidelity way to migrate MySQL database objects (including schema, data, and metadata) from a source database instance to a destination database instance. When you run a Database Migration Service job, all tables from all databases and schemas are migrated, with the exception of the following system databases: sys, mysql, performance_schema, and information_schema.

MySQL system databases, which are not migrated during Database Migration Service jobs, contain information about users and privileges (additional details available in the Migration fidelity Guide). You can manage users and privileges in the destination Cloud SQL database instance after it is created.

Objects that contain metadata defined with the DEFINER clause can fail when invoked on the destination instance, if the user associated with the DEFINER clause does not already exist in the destination instance (additional details available in the Create and run a MySQL migration job containing metadata with a DEFINER clause Guide).

To prevent errors when these objects are invoked on the destination instance after migration, you can complete one of the following actions before running the migration job:

Create the necessary users on the MySQL destination instance, so that all users associated with DEFINER clauses are present in the destination instance; OR:
Update DEFINER clauses to INVOKER on the MySQL source instance. This ensures that the security privileges used to access the data on the destination instance are set to the privileges for the user running the query, rather than the privileges for the user who defined the object.


### Migrate from RDS for MySQL


Encryption type:
- None
- Server Only
- Server-Client
You will an IP allowlist as the connectivity option, so you can consider using SSL/TLS certificates to encrypt the data migrating from the source to the destination instance. 


When you create a new migration job, you first define the source database instance using a previously created connection profile. Then, you create a new destination database instance and configure connectivity between the source and destination instances.




```

# copy down AWS Cli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install


RDS IP:
54.157.86.217
User:
awsstudent
Pass:
Fwfzq89!?DTBDq
Key:
AKIATMMICCOZWSQ6AV2V
Secret:
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


34.28.187.83/32,34.41.49.42/32

export SEG=sg-007d2221d66d5a845
export GCP_IPS=34.28.187.83/32,34.41.49.42/32
aws ec2 authorize-security-group-ingress \
    --group-id $SEG \
    --protocol tcp \
    --port 3306 \
    --cidr $GCP_IPS

```


