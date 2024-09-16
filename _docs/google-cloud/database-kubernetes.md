---
title: Database - Kubernetes
category: Google Cloud
order: 1
---
Database - Kubernetes



```
kubectl create secret generic mssql-secrets --from-literal=SA_PASSWORD="super-secrte-password"

kubectl delete secrets/mssql-secrets
```