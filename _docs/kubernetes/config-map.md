---
title: Config Map
category: Kubernetes
order: 1
---
Config Map

Decoupled from the Pod lifecycle.

Create imperatively:
```
kubectl create configmap <name> 
    --from-literal=<literal-values>
    --from-env=<env-file.env>
    --from-file=<file-name>
    --from-file=<directory-name>
```

Create declaratively:
```
apiVersion: v1
```