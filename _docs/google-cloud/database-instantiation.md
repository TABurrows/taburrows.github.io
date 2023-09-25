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
