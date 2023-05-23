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

Create declaratively (note the environment variable's case is not capitalized on Pod):
```
apiVersion: v1
kind: ConfigMap
metadata:
    name: backend-config
data:
    database_url: jdbc:postgresql://localhost/test
    USER: fred
```

To inject as Environment Variables declaratively using 
```
envFrom.configMapRef
```

In use:
```
apiVersion: v1
kind: Pod
metadata:
    name: configured-pod
spec:
    containers:
    - image: nginx:1.19.0
      name: app
      envFrom:
      - configMapRef:
        name: backend-config
```

Inspect output:
```
kubectl exec configured-pod -- env
...
database_url=jdbc:postgresql://localhost/test
USER=fred
...
```

