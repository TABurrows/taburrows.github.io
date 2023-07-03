---
title: Kubernetes - Private Cluster
category: Google Cloud
order: 1
---
Kubernetes - Private Cluster

Task 1. Set a zone
Task 2. Creating a private cluster
Task 3. Viewing your subnet and secondary address ranges
Task 4. Enabling master authorized networks

Task 6. Creating a private cluster that uses a custom subnetwork


A Private Cluster is a cluster that makes your master inaccessible from the public internet. In a private cluster, nodes do not have public IP addresses, only private addresses, so your workloads run in an isolated environment. Nodes and masters communicate with each other using VPC peering.

In the Kubernetes Engine API, address ranges are expressed as Classless Inter-Domain Routing (CIDR) blocks.

When you create a private cluster, you must specify a /28 CIDR range for the VMs that run the Kubernetes master components and you need to enable IP aliases.

eg. to specify a CIDR range of 172.16.0.16/28 for the masters. When you enable IP aliases, you let Kubernetes Engine automatically create a subnetwork for you.
Create the private cluster by using the --private-cluster, --master-ipv4-cidr, and --enable-ip-alias flags
```
# Leaving the --creat-subnetwork as an empty string "" means it is auto-created
#  in the format: gke-private-cluster-subnet-xxxxxxxx
gcloud beta container clusters create private-cluster \
    --enable-private-nodes \
    --master-ipv4-cidr 172.16.0.16/28 \
    --enable-ip-alias \
    --create-subnetwork ""


# Get the newly create subnet
gcloud compute networks subnets describe gke-private-cluster-subnet-xxxxxxxx --region us-central1
# check 'privateIpGoogleAccess: true'
```



List the subnets in the 'default' network:
```
gcloud compute networks subnets list --network default
```


Enabling master authorized networks
Only IP addresses that have access to the master are the addresses in these ranges:

- The primary range of your subnetwork. This is the range used for nodes.
- The secondary range of your subnetwork that is used for pods.

To provide additional access to the master, you must AUTHORIZE selected address ranges.


Run the following to Authorize your external address range:
```
# Allows a single Public IP address to access Private Cluster Master servers
gcloud container clusters update private-cluster \
    --enable-master-authorized-networks \
    --master-authorized-networks 35.192.107.237/32

# connectivity can be confirmed with 'kubectl' running on 35.192.107.237/32
# eg. kubectl get nodes --output yaml | grep -A4 addresses
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
gcloud container clusters get-credentials private-cluster --zone us-central1-a
kubectl get nodes --output yaml | grep -A4 addresses
kubectl get nodes --output wide
```


Delete a Private Cluster:
```
gcloud container clusters delete private-cluster --zone us-central1-a
```


Note: The Pod address range limits the maximum size of the cluster.
```
gcloud compute networks subnets create my-subnet \
    --network default \
    --range 10.0.4.0/22 \
    --enable-private-ip-google-access \
    --region us-central1 \
    --secondary-range my-svc-range=10.0.32.0/20,my-pod-range=10.4.0.0/14

gcloud beta container clusters create private-cluster2 \
    --enable-private-nodes \
    --enable-ip-alias \
    --master-ipv4-cidr 172.16.0.32/28 \
    --subnetwork my-subnet \
    --services-secondary-range-name my-svc-range \
    --cluster-secondary-range-name my-pod-range \
    --zone us-central1-a
```


You cannot connect directly to a Kubernetes Engine private cluster from a VPC or other network outside of the VPC the private cluster has been deployed to if the enable-private-endpoint option has been specified. This represents the highest security option for a private cluster and you must use a jumphost, or a proxy within the same VPC as the cluster, and you must use that jumphost or proxy to connect to the internal managment ip-address for the cluster.


Make sure to use the gke-gcloud-auth-plugin, which is needed for continued use of kubectl
Installation:
```
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
echo "export USE_GKE_GCLOUD_AUTH_PLUGIN=True" >> ~/.bashrc
source ~/.bashrc
gcloud container clusters get-credentials <your cluster name> --internal-ip --project=<project ID> --zone <cluster zone>
```