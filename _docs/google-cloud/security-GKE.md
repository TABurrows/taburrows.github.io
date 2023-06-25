---
title: Security - GKE Kubernetes 
category: Google Cloud
order: 1
---
Security - GKE Kubernetes



Containers use the Pod's network namespace, including its IP Address and Ports

Containers within a Pod can communicate across localhost/127.0.0.1

Workloads are implemented by Pods: applications, microservices, daemons, jobs

In GKE, each node is a separate Virtual Machine and has its ownn operating system

GKE manages the Control Plane internally and hides it from view; in the Cloud Console, you will not see a "Control Plane"

k8s secrets can be encrypted ( is done by default by GKE along with content stored at rest )

Pods use secrets to gain the access they need within an environment

A Secret is created using the k8s API and is only available in GKE

by default, Secrets created within Google Cloud are not available with k8s

use Workload Identity to configure a k8s Service Account to act as Google Service Account

Three types of account:
- Google Accounts
- Google Cloud Service Accounts
- Kubernetes Service Accounts
[ use principal of least privilege and go with a k8s service account ]


Hardening/strengthening Clusters:
- keep updated and patched ( in GKE the Control Planes are patched and upgraded automatically ) ( Node Auto-Upgrade automatically updates Nodes in the k8s cluster )
  - there are 3 types of automatic updates:
    - Rapid (quickest access)
    - Regular (default - regular cadence)
    - Stable (allow more time for feature validation)
- Regularly audit Cluster Configurations for Deviations from the defined settings. Common misconfigurations and recommendations can be automatically monitored using the new Security Health Analytics. When enabled it will run scans on your selected resources, twice a day at 12 hour intervals
- Limit the exposure of your Cluster Control Plane and Nodes to the internet. By default, GKE Cluster Control Plane and Nodes have internet-routable addresses - but these can de disabled at the time of cluster creation: "Private Cluster" = network-level protection to your GKE control plane:
  - Public Endpoint Access Disabled = prevents all internet access to both control planes and nodes and works with Networks using Cloud Interconnect and Cloud VPN
  - Public Endpoint Access Enabled, Control Plane Authrozied Networks Enabled = gives the Control Plane a Public IP Address, but installs a Customer Configurable Firewall in front that allows Public Internet Connections withou the use of VPN
  - Public Endpoint Access Enabled, Control Plane Authorized Networks disabled = DEFAULT setting that allows any Public Internet user to make connections to the Control Plane

To disable direct Internet Access to Nodes:
```
gcloud ... --enable-private-nodes ...
```

- Using Groups to Control Identities and Access is a Security Best Practice, you can use Group Authentication with GKE Clusters, which removes the need to update your Role Based Access Control configuration whenever anyone is added or removed from the Group. [ Google Groups for GKE must be ENABLED while you are creating the clusters ]
  
- Each node in GKE is given the Compute Engine Default Service Account, which is probably too broad a set of accesses, probably too many permissions. Instead create and use a Minimally-privileged Service Account to run your GKE Cluster instead - minimum Roles required for GKE:
  - monitoring.viewer
  - monitoring.metricWriter
  - logging.logWriter


- create separate Namespaces or Clusters for each team and their environment

- Assign COST CENTERS and appropriate labels to each Namespace for Accountability and Chargeback

- Shielded GKE Nodes, like Shielded VMs provide verifiably secure Compute Engine instances, provide verifiable Node Identity and Integrity. This can be set on Cluster CREATION or UPDATE:
  ```
    gcloud ... --enabled-shielded-nodes ...
  ```
  Shielded GKE Nodes should be enabled with Secure Boot, however Secure Boot should not used if you need to use 3rd Party Unsigned Kernel modules.

- Disable inter-pod communication to prevent lateral movement ( this also offers services some protection against accidental or deliberate denial of service ).  The two recommended ways to restrict traffic between pods are to use:
  - Istio ( which also offers load balancing, service authorization, throttling, quota and metrics )
  - or, Kubernetes Network Policies to provide Basic Access Control Functionality


The Container-Optimized OS with * containerd * (cos_containerd) image is a variant of the Container-Optimized OS with containerd that is directly integrated with GKE. ( containerd is the core runtime component of Docker and has been designed to deliver core container functionality for the Kubernetes Containter Runtime Interface [ CRI ] ). It is significantly less complex than the full Docker daemon, and therefore has a smaller attack surface.

K8s Secret Managment
- usually stored in the /etcd, Hashicorp Vault which can be intergrated with GKE Clusters and will need to be set up before creating the clusters.
- another option, to use Kubernetes Secrets natively in GKE, making sure to encrypt these at the application layer with a key that you manage.
  ( some solutions will work both in GKE and in Anthos GKE on-prem, and so may be a better option for hybrid cloud environments )

by default, clustes come with a permissive set of discovery ClusterRoleBindings which can give too broad access to information about a clsuter's APIs. ( nb the system:authenticated Group can include any authenticated users - including any user with a Google account ) and should be restricted.
    To harden against discovery exploits, you can:
        - Configure authorized networks to restrict access to only a set of IP ranges
        - Set up a private cluster to restrict access to only certain VPCs
        - Curate the Subjects of the default system:discovery and system:basic-user ClusterRoleBindings to allow access by only certain known Users and Groups

GKE creates Firewall Rules automatically (priority 1000) when creating:
- Clusters
- Services
- Ingresses
Don't delete or modify these, instead use Rules with a Higher Priority

Limit Pod container permissions
Set security related options via the Security Context on both Pods and Containers eg change "run as" user and group
To change settings at the Cluster level, you will need to implement PodSecurityPolicy or PodSecurity admission controllers based on the Kubernetes version, to ensure that all Pods in a cluster adhere to a defined * minimum basealine policy * 

Workload identity: you can configure a K8S Service Account to act as a Google Service Account (creates a relationship between K8S Service Accounts and IAM Service Accounts)
- assign fine-grained identity and authorization for application in clusters
- assign identity and prove it to external identity solutions
- provides strong security guarantees
- enforces principle of least privilege
- preserves k8s abstractin layer

Binary Authorization: enforce the deployment of only trusted containers into GKE. Provides Software Supply-Chain security for applications that run in the Cloud. Works with images that you deploy to GKE from Container Registry/image registry

- ensure that the internal processes that safeguard the quality and integrity of your software have successfully completed before an application is deployed to your production environment

Binary Authorization implementation:
- First, you enable binary authorization on your GKE cluster. 
- Next, you add a policy that requires signed images.
- Then, when an image is built by Cloud Build an “attestor” verifies that it was from a trusted repository 
(for example, Source Repositories, which are fully featured, private Git repositories hosted on Google Cloud).
- Finally, Container Registry includes a vulnerability scanner that scans containers



Monitoring:
- GKE Monitoring enabled by default, generates dashboard:
  - view a cluster's key preformance metrics: CPU & Mem use, Open Incidents
  
- Summary Pane
- Toolbar
- Time line selector
- Details

Organize Cluster information with hierarchies:
- Infrastructure: Cluster > Node > Pod > Container
- Workloads: Cluster > Namespace > Workload > Pod > Container
- Services: Cluster > Namespace > Service > Pod > Container
