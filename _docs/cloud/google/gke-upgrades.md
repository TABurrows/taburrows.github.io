


GKE Upgrades

GKE is a managed service and GCP keep the Cluster Control Plane up-to-date and secure. In GCP, Google manages and runs the Cluster Master, whilst kubectl executed externally controls the Google Managed Cluster Master and the Customer Managed NODES.

Cluster Control Planes are always upgraded on a regular basis, regardless of whether the cluster is enrolled in a release channel or not
    - Automatic upgrades can be controlled by defining maintenance windows and exclusions
    - Manul upgrades/downgrades possible

Control plane is not 100% accessible during upgrades unless the cluster is REGIONAL.
    - Regional masters are upgrade by rolling update and the uptime SLO is 99.95%