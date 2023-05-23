---
title: ConfigMap
category: Kubernetes
order: 1
---
ConfigMap

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
kind: ConfigMap
metadata:
    name: backend-config
data:
```