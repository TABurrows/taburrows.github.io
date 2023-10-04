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


### Configure Replication

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


Download and apply some additional configuration files:
```
sudo su - postgres -c "gsutil cp gs://cloud-training/gsp918/pg_hba_append.conf ."
sudo su - postgres -c "gsutil cp gs://cloud-training/gsp918/postgresql_append.conf ."
sudo su - postgres -c "cat pg_hba_append.conf >> /etc/postgresql/13/main/pg_hba.conf"
sudo su - postgres -c "cat postgresql_append.conf >> /etc/postgresql/13/main/postgresql.conf"
sudo systemctl restart postgresql@13-main

```

in pg_hba.conf:
```
host all all 0.0.0.0/0 md5
```

in postgres.conf:
```
# Add configuration for pglogical database extension
wal_level = logical         # minimal, replica, or logical
max_worker_processes = 10   # one per database needed on provider node
                            # one per node needed on subscriber node
max_replication_slots = 10  # one per node needed on provider node
max_wal_senders = 10        # one per node needed on provider node
shared_preload_libraries = 'pglogical'
max_wal_size = 1GB
min_wal_size = 80MB
listen_addresses = '*'         # what IP address(es) to listen on, '*' is all

```


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

### Building a PostgreSQL driven App

Configure the environment:
```
# configure environment
gcloud config set compute/zone "us-west1-c"
export ZONE=$(gcloud config get compute/zone)

gcloud config set compute/region "us-west1"
export REGION=$(gcloud config get compute/region)

gcloud services enable artifactregistry.googleapis.com

export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
export CLOUDSQL_SERVICE_ACCOUNT=cloudsql-service-account



# Create service account 
gcloud iam service-accounts create $CLOUDSQL_SERVICE_ACCOUNT --project=$PROJECT_ID

# Create service account policy binding for cloudsql admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
--member="serviceAccount:$CLOUDSQL_SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com" \
--role="roles/cloudsql.admin" 

# Create and export service account keys
gcloud iam service-accounts keys create $CLOUDSQL_SERVICE_ACCOUNT.json \
    --iam-account=$CLOUDSQL_SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com \
    --project=$PROJECT_ID

```


The application provided is a simple Flask-SQLAlchemy web application called gMemegen. It creates memes by supplying a set of photographs and capturing header and footer text, storing them in the database and rendering the meme to a local folder. It runs on a single pod with two containers; one for the application and one for the Cloud SQL Auth Proxy deployed in the side-car pattern.

A load balancer will marshal requests between the app and the database through the side-car. This load balancer will expose an external Ingress IP address through which you will access the app in your browser.

```
# Create a GKE cluster
ZONE=us-west1-c
gcloud container clusters create postgres-cluster --zone=$ZONE --num-nodes=2


# Create Kubernetes Secrets containing the Cloud SQL connect credentials
kubectl create secret generic cloudsql-instance-credentials \
--from-file=credentials.json=$CLOUDSQL_SERVICE_ACCOUNT.json
    
kubectl create secret generic cloudsql-db-credentials \
--from-literal=username=postgres \
--from-literal=password=supersecret! \
--from-literal=dbname=gmemegen_db


# Download and build the app
gsutil -m cp -r gs://spls/gsp919/gmemegen .
cd gmemegen



# Create env vars for the Artifact Registry
export REGION=us-west1
export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
export REPO=gmemegen


# Configure Docker Authentication for the Artifact Registry
gcloud auth configure-docker ${REGION}-docker.pkg.dev


# create the Artifact Registry Repo
gcloud artifacts repositories create $REPO \
    --repository-format=docker --location=$REGION


# Build a local docker image
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/gmemegen/gmemegen-app:v1 .


# Push the image to the Artifact Registry:
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/gmemegen/gmemegen-app:v1


```



You must modify the Kubernetes deployment manifest for the gMemegen application to point at the correct container and configure the Cloud SQL Auth Proxy side-car with the connection string for the Cloud SQL PostgreSQL instance.

Replace REGION and PROJECT_ID

Then deploy the modified app:
```


# Re-auth for kubectl if required
# see:
#  https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
gcloud components install gke-gcloud-auth-plugin
# or
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
gke-gcloud-auth-plugin --version
gcloud container clusters get-credentials postgres-cluster



# Redeploy modified app
kubectl create -f gmemegen_deployment.yaml

# Inspect
kubectl get pods




# Connect to a load balancer
kubectl expose deployment gmemegen \
    --type "LoadBalancer" \
    --port 80 --target-port 8080


# Get external iP
kubectl describe service gmemegen

# Visit external IP and create some data with clickable link
export LOAD_BALANCER_IP=$(kubectl get svc gmemegen \
-o=jsonpath='{.status.loadBalancer.ingress[0].ip}' -n default)
echo gMemegen Load Balancer Ingress IP: http://$LOAD_BALANCER_IP


# View Apps activity
POD_NAME=$(kubectl get pods --output=json | jq -r ".items[0].metadata.name")
kubectl logs $POD_NAME gmemegen | grep "INFO"


# Connect to the Cloud SQL instance
# Databases -> SQL -> Overview -> Ctl+f 'Connect to this instance'
gcloud sql connect postgres-gmemegen --user=postgres --quiet

```

### Enable Backups

```
# get existing info
export CLOUD_SQL_INSTANCE=postgres-orders
gcloud sql instances describe $CLOUD_SQL_INSTANCE


# Get the current time
date +"%R"

# To enable scheduled backups
gcloud sql instances patch $CLOUD_SQL_INSTANCE \
    --backup-start-time=09:20

# get backup info
gcloud sql instances describe $CLOUD_SQL_INSTANCE --format 'value(settings.backupConfiguration)'

```




### Enable Point-in-Time Recovery

A point-in-time recovery always creates a new instance; you cannot perform a point-in-time recovery to an existing instance. The new instance inherits the settings of the source instance.

```
# enable point-in-time-recovery
gcloud sql instances patch $CLOUD_SQL_INSTANCE \
    --enable-point-in-time-recovery \
    --retained-transaction-log-days=1


# get the latest timestamp for point-in-time
date --rfc-3339=seconds

# modify the table
\c orders;
INSERT INTO distribution_centers VALUES(-80.1918,25.7617,'Miami FL',11);
SELECT COUNT(*) FROM distribution_centers;

# perform point-in-time
export NEW_INSTANCE_NAME=postgres-orders-pitr
export CLOUD_SQL_INSTANCE=postgres-orders
gcloud sql instances clone $CLOUD_SQL_INSTANCE $NEW_INSTANCE_NAME \
    --point-in-time '2023-10-04 09:53:27+00:00'

```




### Workflow for Replication
```


# CLOUD SHELL:
# enable APIs
gcloud services enable servicenetworking.googleapis.com
gcloud services enable datamigration.googleapis.com


# PG VM:
# Install pglogical
sudo apt install postgresql-13-pglogical


# edit pg_hba.conf
host    all all 0.0.0.0/0   md5


# edit postgres.conf
wal_level = logical         # minimal, replica, or logical
max_worker_processes = 10   # one per database needed on provider node
                            # one per node needed on subscriber node
max_replication_slots = 10  # one per node needed on provider node
max_wal_senders = 10        # one per node needed on provider node
shared_preload_libraries = 'pglogical'
max_wal_size = 1GB
min_wal_size = 80MB
listen_addresses = '*'         # what IP address(es) to listen on, '*' is all


# restart service
sudo systemctl restart postgresql@13-main

# Open a connect to db
sudo -u postgres psql
# or
# sudo su - postgres
# psql

# Create the extenions in the db
\c postgres;
CREATE EXTENSION pglogical;
\c orders;
CREATE EXTENSION pglogical;


# ensure tables have primary keys
# for each table \d inventory_items;
\c orders;
ALTER TABLE inventory_items ADD PRIMARY KEY (id);



\c postgres;
CREATE USER import_user PASSWORD 'DMS_1s_cool!';
ALTER DATABASE orders OWNER TO import_user;
ALTER ROLE import_user WITH REPLICATION;
GRANT USAGE ON SCHEMA pglogical TO import_user;
GRANT ALL ON SCHEMA pglogical TO import_user;
GRANT SELECT ON pglogical.tables TO import_user;
GRANT SELECT ON pglogical.depend TO import_user;
GRANT SELECT ON pglogical.local_node TO import_user;
GRANT SELECT ON pglogical.local_sync_status TO import_user;
GRANT SELECT ON pglogical.node TO import_user;
GRANT SELECT ON pglogical.node_interface TO import_user;
GRANT SELECT ON pglogical.queue TO import_user;
GRANT SELECT ON pglogical.replication_set TO import_user;
GRANT SELECT ON pglogical.replication_set_seq TO import_user;
GRANT SELECT ON pglogical.replication_set_table TO import_user;
GRANT SELECT ON pglogical.sequence_state TO import_user;
GRANT SELECT ON pglogical.subscription TO import_user;

\c orders;
GRANT USAGE ON SCHEMA pglogical TO import_user;
GRANT ALL ON SCHEMA pglogical TO import_user;
GRANT SELECT ON pglogical.tables TO import_user;
GRANT SELECT ON pglogical.depend TO import_user;
GRANT SELECT ON pglogical.local_node TO import_user;
GRANT SELECT ON pglogical.local_sync_status TO import_user;
GRANT SELECT ON pglogical.node TO import_user;
GRANT SELECT ON pglogical.node_interface TO import_user;
GRANT SELECT ON pglogical.queue TO import_user;
GRANT SELECT ON pglogical.replication_set TO import_user;
GRANT SELECT ON pglogical.replication_set_seq TO import_user;
GRANT SELECT ON pglogical.replication_set_table TO import_user;
GRANT SELECT ON pglogical.sequence_state TO import_user;
GRANT SELECT ON pglogical.subscription TO import_user;
GRANT USAGE ON SCHEMA public TO import_user;
GRANT ALL ON SCHEMA public TO import_user;
GRANT SELECT ON public.distribution_centers TO import_user;
GRANT SELECT ON public.inventory_items TO import_user;
GRANT SELECT ON public.order_items TO import_user;
GRANT SELECT ON public.products TO import_user;
GRANT SELECT ON public.users TO import_user;
ALTER TABLE public.distribution_centers OWNER TO import_user;
ALTER TABLE public.inventory_items OWNER TO import_user;
ALTER TABLE public.order_items OWNER TO import_user;
ALTER TABLE public.products OWNER TO import_user;
ALTER TABLE public.users OWNER TO import_user;







# In console add Network for vm

# In console add User

# IAM
\c orders;
GRANT ALL PRIVILEGES ON TABLE inventory_items TO "student-02-c02cb45c1721@qwiklabs.net";

export USERNAME=student-02-c02cb45c1721@qwiklabs.net
export POSTGRESQL_IP=34.125.139.212
export PGPASSWORD=$(gcloud auth print-access-token)
psql --host=$POSTGRESQL_IP $USERNAME --dbname=orders







# enable point-in-time-recovery
export CLOUD_SQL_INSTANCE=postgres35-kf3qf
gcloud sql instances patch $CLOUD_SQL_INSTANCE \
    --enable-point-in-time-recovery \
    --retained-transaction-log-days=5

# get the latest timestamp for point-in-time
export PIT=$(date --rfc-3339=seconds)

# modify the table
\c orders;
SELECT COUNT(*) FROM distribution_centers;
INSERT INTO distribution_centers VALUES(-80.1918,25.7617,'Miami FL',11);
SELECT COUNT(*) FROM distribution_centers;

# perform point-in-time
export NEW_INSTANCE_NAME=postgres-orders-pitr
gcloud sql instances clone $CLOUD_SQL_INSTANCE $NEW_INSTANCE_NAME \
    --point-in-time "$PIT"




```
