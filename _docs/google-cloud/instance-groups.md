---
title: VM Instance Groups
category: Google Cloud
order: 1
---
VM - Instance Groups



Sample Creation Scripts:
```
gcloud beta compute instance-groups managed create instance-group-1 --project=qwiklabs-gcp-04-253746aae693 --base-instance-name=instance-group-1 --size=1 --template=instance-template-1 --zone=us-central1-a --list-managed-instances-results=PAGELESS --no-force-update-on-repair

gcloud beta compute instance-groups managed set-autoscaling instance-group-1 --project=qwiklabs-gcp-04-253746aae693 --zone=us-central1-a --cool-down-period=60 --max-num-replicas=5 --min-num-replicas=1 --mode=on --target-cpu-utilization=0.8
```