---
title: Networks - Network Intelligence Center
category: Google Cloud
order: 1
---
Networks - Network Intelligence Center

~75% of network outages are misconfigs

Diagnose issues using Connectivity Test

Centralized monitoring cuts down troubleshooting time and effort, increases network security, and improves the overall user experience.

Network Intelligence Center modules offer network topology visualization, network connectivity tests, a performance dashboard and firewall insights

You can create, save and run tests to help verify the impact of configuration changes and ensure that NETWORK INTENT captured by these tests is not violated, proactively preventing network outages

Firewall Insights Metrics - hit counts

Insight types eg. google.compute.firewall.Insight



### Connectivity Tests

gcloud beta network-management connectivity-tests create  --destination-port=80 --destination-project=thing-industries-dev-a --protocol=TCP --source-project=thing-industries-dev-a --project=thing-industries-dev-a

Destination Endpoint options:
VM Instance
IP Address
Cloud SQL Instance
GKE Cluster Control Plane