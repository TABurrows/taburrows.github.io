---
title: Database - Instantiation
category: Google Cloud
order: 1
---
Database - Instantiation



```
gcloud compute instances create db-server-name \
    --project=<project-id> \
    --zone=europe-west4 \
    --machine-type=n1-standard-4 \
    --metadata=startup-script=\#\!\/bin/bash$'\n'ap-get\ update$'\n'apt-get\ install\ -y\ mysql-server$'\n'systemctl\ status\ mysql \
    --boot-disk-size=10GB
```


### Oracle
Oracle does not certify running their Oracle DB software on Google Cloud VMs.  The solution here is to use Bare Metal instances.


### GKE
The control plane node is provided by GKE
(configure disk space for database - PersistentVolumeClaim -> Volumes -> VolumeMounts )
1. Package application inside a Dockerfile
2. Configure the yml file for the application


```
gcloud container clusters create kubernetes-cluster --zone=us-central1-a --project=<project-id>

kubectl get nodes
```

Set a kubernetes secret:
```
kubectl create secret generic mysql-secrets --from-literal=ROOT_PASSWORD="SUPER-SECRET-PASSW0RD-HERE!"
```

K8S Services provide connectivity.
Ports -> Protocol -> Container Port

Applying the configuration:
```
kubectl apply -f config-file.yml
```


Applying a helm chart (helm is already installed in a Google Cloud Shell):
```
helm install --name mysqldb stable/mssql-linux --set acceptEula.value=Y --set edition.value=Developer
```
