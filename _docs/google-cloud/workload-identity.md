


Configuration Basics

```

kubectl create namespace K8S_NAMESPACE

kubectl create serviceaccount --namespace K8S_NAMESPACE KSA_NAME

gcloud iam service-accounts create GSA_NAME

gcloud iam service-accounts add-iam-policy-binding \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:<PROJECT_ID>.svc.id.goog[K8S_NAMESPACE/KSA_NAME]" \
    GSA_NAME@<PROJECT_ID>.iam.gserviceaccount.com

kubectl annotate serviceaccount \
    --namespace K8S_NAMESPACE KSA_NAME \
    iam.gke.io/gcp-service-account=GSA_NAME@<PROJECT_ID>.iam.gserviceaccount.com

```