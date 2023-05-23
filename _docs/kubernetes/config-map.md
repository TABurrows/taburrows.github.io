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
spec.containers[image].envFrom.configMapRef
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

You can re-assign env var keys for ConfigMap entries with:
```
spec.containers[image].env[name].valueFrom.configMapKeyRef
```

In use:
```
apiVersion: v1
kind: Pod
metadata: configured-pod
spec:
    containers:
    - image: nginx:1.19.0
      name: app
      env:
      - name: DATABASE_URL
        valueFrom:
            configMapKeyRef:
                name: backend-config
                key: database_url
      env:
      - name: USERNAME
        valueFrom:
            configMapKeyRef:
                name: backend-config
                key: user
```

Inspect:
```
kubectl exec configured-pod -- env
...
DATABASE_URL=jdbc:/postgresql://localhost/test
USERNAME=fred
...
```

