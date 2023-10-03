---
title: Database - PostgreSQL
category: Google Cloud
order: 1
---
Database - PostgreSQL


### Migration

Overview:
- Prepare the source database for migration.
- Create a profile for a source connection to a PostgreSQL instance (e.g., stand-alone PostgreSQL).
- Configure connectivity between the source and destination database instances using VPC peering.
- Configure firewall and database access rules to allow access to the source database for migration.
- Create, run, and verify a continuous migration job using Database Migration Service.
- Promote the destination instance (Cloud SQL for PostgreSQL) to be a stand-alone database for reading and writing data.


- Verify that the Database Migration API is enabled
- Verify that the Service Networking API is enabled - The Service Networking API is required in order to be able to configure Cloud SQL to support VPC Peering and connections over a private ip-address


Add supporting features to the source database which are required in order for Database Migration Service to perform a migration:

- Installing and configuring the pglogical database extension.
- Configuring the stand-alone PostgreSQL database to allow access from Cloud Shell and Cloud SQL.
- Adding the pglogical database extension to the postgres, orders and gmemegen_db databases on the stand-alone server.
- Creating a migration_admin user (with Replication permissions) for database migration and granting the required permissions to schemata and relations to that user.


Install pglogical:
```
sudo apt install postgresql-13-pglogical
```
Note: pglogical is a logical replication system implemented entirely as a PostgreSQL extension. Fully integrated, it requires no triggers or external programs. This alternative to physical replication is a highly efficient method of replicating data using a publish/subscribe model for selective replication. Read more here: https://github.com/2ndQuadrant/pglogical



Create the migration user:
```
CREATE USER migration_admin PASSWORD 'DMS_1s_cool!';
ALTER DATABASE orders OWNER TO migration_admin;
ALTER ROLE migration_admin WITH REPLICATION;
```

Assign migration user permissions:
```
\c postgres;
GRANT USAGE ON SCHEMA pglogical TO migration_admin;
GRANT ALL ON SCHEMA pglogical TO migration_admin;
GRANT SELECT ON pglogical.tables TO migration_admin;
GRANT SELECT ON pglogical.depend TO migration_admin;
GRANT SELECT ON pglogical.local_node TO migration_admin;
GRANT SELECT ON pglogical.local_sync_status TO migration_admin;
GRANT SELECT ON pglogical.node TO migration_admin;
GRANT SELECT ON pglogical.node_interface TO migration_admin;
GRANT SELECT ON pglogical.queue TO migration_admin;
GRANT SELECT ON pglogical.replication_set TO migration_admin;
GRANT SELECT ON pglogical.replication_set_seq TO migration_admin;
GRANT SELECT ON pglogical.replication_set_table TO migration_admin;
GRANT SELECT ON pglogical.sequence_state TO migration_admin;
GRANT SELECT ON pglogical.subscription TO migration_admin;



\c orders;
GRANT USAGE ON SCHEMA pglogical TO migration_admin;
GRANT ALL ON SCHEMA pglogical TO migration_admin;
GRANT SELECT ON pglogical.tables TO migration_admin;
GRANT SELECT ON pglogical.depend TO migration_admin;
GRANT SELECT ON pglogical.local_node TO migration_admin;
GRANT SELECT ON pglogical.local_sync_status TO migration_admin;
GRANT SELECT ON pglogical.node TO migration_admin;
GRANT SELECT ON pglogical.node_interface TO migration_admin;
GRANT SELECT ON pglogical.queue TO migration_admin;
GRANT SELECT ON pglogical.replication_set TO migration_admin;
GRANT SELECT ON pglogical.replication_set_seq TO migration_admin;
GRANT SELECT ON pglogical.replication_set_table TO migration_admin;
GRANT SELECT ON pglogical.sequence_state TO migration_admin;
GRANT SELECT ON pglogical.subscription TO migration_admin;



GRANT USAGE ON SCHEMA public TO migration_admin;
GRANT ALL ON SCHEMA public TO migration_admin;
GRANT SELECT ON public.distribution_centers TO migration_admin;
GRANT SELECT ON public.inventory_items TO migration_admin;
GRANT SELECT ON public.order_items TO migration_admin;
GRANT SELECT ON public.products TO migration_admin;
GRANT SELECT ON public.users TO migration_admin;


# Grant migration service ownership
\c orders;
\dt
ALTER TABLE public.distribution_centers OWNER TO migration_admin;
ALTER TABLE public.inventory_items OWNER TO migration_admin;
ALTER TABLE public.order_items OWNER TO migration_admin;
ALTER TABLE public.products OWNER TO migration_admin;
ALTER TABLE public.users OWNER TO migration_admin;
\dt


```




A connection profile stores information about the source database instance (e.g., stand-alone PosgreSQL) and is used by the Database Migration Service to migrate data from the source to your destination Cloud SQL database instance. After you create a connection profile, it can be reused across migration jobs.


When you create a new migration job, you first define the source database instance using a previously created connection profile. Then you create a new destination database instance and configure connectivity between the source and destination instances.



Note: Continuous migration jobs remain in a running status to ensure that the destination database continues to receive data updates from the source.

A completed status is achieved after the destination database is promoted to be a stand-alone database for reading and writing data which you will see in the final task in the lab.


```
gcloud sql connect postgresql-cloudsql --user=postgres --quiet

export VM_NAME=postgresql-vm
export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
export POSTGRESQL_IP=$(gcloud compute instances describe ${VM_NAME} \
  --zone=us-east1-b --format="value(networkInterfaces[0].accessConfigs[0].natIP)")
echo $POSTGRESQL_IP
psql -h $POSTGRESQL_IP -p 5432 -d orders -U migration_admin

```




### Promote migration job

Promote disconnects the source from the destination, and promotes the destination to be a writeable instance. It's recommended to stop writes to the source, and to wait until the replication delay is at zero before initiating promote.





### CMEK for Cloud SQL PostgreSQL

It is not possible to patch an existing instance to enable CMEK.



You can create the service account you require for Cloud SQL CMEK using the gcloud beta services identity create command:
```
export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
gcloud beta services identity create \
    --service=sqladmin.googleapis.com \
    --project=$PROJECT_ID
```


Create a Cloud KMS Keyring and Key to use with CMEK:
```
export KMS_KEYRING_ID=cloud-sql-keyring
export ZONE=$(gcloud compute instances list --filter="NAME=bastion-vm" --format=json | jq -r .[].zone | awk -F "/zones/" '{print $NF}')
export REGION=${ZONE::-2}
gcloud kms keyrings create $KMS_KEYRING_ID \
 --location=$REGION
```


Create the KMS Key:
```
export KMS_KEY_ID=cloud-sql-key
gcloud kms keys create $KMS_KEY_ID \
--location=$REGION \
--keyring=$KMS_KEYRING_ID \
--purpose=encryption
```



Bind the key to the Service Account:
```
export PROJECT_NUMBER=$(gcloud projects describe ${PROJECT_ID} \
    --format 'value(projectNumber)')
gcloud kms keys add-iam-policy-binding $KMS_KEY_ID \
    --location=$REGION \
    --keyring=$KMS_KEYRING_ID \
    --member=serviceAccount:service-${PROJECT_NUMBER}@gcp-sa-cloud-sql.iam.gserviceaccount.com \
    --role=roles/cloudkms.cryptoKeyEncrypterDecrypter
```


Find external IP of instance:
```
export AUTHORIZED_IP=$(gcloud compute instances describe bastion-vm \
    --zone=$ZONE \
    --format 'value(networkInterfaces[0].accessConfigs.natIP)')
echo Authorized IP: $AUTHORIZED_IP


export CLOUD_SHELL_IP=$(curl ifconfig.me)
echo Cloud Shell IP: $CLOUD_SHELL_IP


export KEY_NAME=$(gcloud kms keys describe $KMS_KEY_ID \
    --keyring=$KMS_KEYRING_ID --location=$REGION \
    --format 'value(name)')
export CLOUDSQL_INSTANCE=postgres-orders
gcloud sql instances create $CLOUDSQL_INSTANCE \
    --project=$PROJECT_ID \
    --authorized-networks=${AUTHORIZED_IP}/32,$CLOUD_SHELL_IP/32 \
    --disk-encryption-key=$KEY_NAME \
    --database-version=POSTGRES_13 \
    --cpu=1 \
    --memory=3840MB \
    --region=$REGION \
    --root-password=supersecret!



# apply pgaudit patch
gcloud sql instances patch $CLOUDSQL_INSTANCE \
    --database-flags cloudsql.enable_pgaudit=on,pgaudit.log=all




# Audit log queries
resource.type="cloudsql_database"
logName="projects/qwiklabs-gcp-00-b591c38d0665/logs/cloudaudit.googleapis.com%2Fdata_access"
protoPayload.request.@type="type.googleapis.com/google.cloud.sql.audit.v1.PgAuditEntry"

```



### IAM Authentication for Cloud SQL for PostgreSQL

In this task you will configure Cloud SQL IAM database authentication. All of the database access and update tasks you have performed so far have used built-in PostgreSQL user accounts. You can also create Cloud SQL for PostgreSQL users using Cloud IAM accounts. Database users can authenticate to Cloud SQL using Cloud IAM instead of using built-in database accounts and fine-grained permissions at the database level can be granted to those users.

Access can be granted at the Table level.

Cloud SQL IAM database authentication uses OAuth 2.0 access tokens is the Cloud IAM user password, which are short-lived and only valid for one hour so you should regenerate the token every time you need to authenticate. The access token should always be passed into the psql command using the PGPASSWORD environment variable as the buffer for the psql password parameter is too small to hold the OAuth 2.0 token string.

```
GRANT ALL PRIVILEGES ON TABLE order_items TO "student-02-d9918ac00212@qwiklabs.net";
\q

export PGPASSWORD=$(gcloud auth print-access-token)
psql --host=$POSTGRESQL_IP $USERNAME --dbname=orders
```

