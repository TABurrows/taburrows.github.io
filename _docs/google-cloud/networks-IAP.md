---
title: Networks - Identity Aware Proxy
category: Google Cloud
order: 1
---
Networks - Identity Aware Proxy

- use IAP to enable administrative access to VMS (eg via ssh, rdp) that do not have external IPs

A mesh of proxies deployed in the Cloud


IAP uses your existing project roles and permissions when you connect to VM instances. By default, instance owners are the only users that have the IAP Secured Tunnel User role.



The Identity Aware Proxy CIDR netblock is 35.235.240.0/20


To tunnel ssh traffic through IAP:
```
gcloud compute ssh NAME_OF_VM_INSTANCE --tunnel-through-iap
```

```
gcloud compute start-iap-tunnel INSTANCE_NAME INSTANCE_PORT \
    --local-host-port=localhost:LOCAL_PORT \
    --zone=ZONE
```

TCP Forwarding

It is possible to use IAP Desktop to connect to instances using a graphical user interface from an instance with Windows Desktop. You can read more about IAP Desktop on the GitHub repository hosting the download for the tool.

```
gcloud compute start-iap-tunnel windows-iap 3389 --local-host-port=localhost:0 --zone=us-east1-c
```