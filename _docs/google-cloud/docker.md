---
title: Google Cloud - Docker
category: Google Cloud
order: 1
---
Google Cloud - Docker



gcloud auth configure-docker adds the Docker credHelper entry to Docker's
configuration file, or creates the file if it doesn't exist. This will
register gcloud as the credential helper for all Google-supported Docker
registries. If the Docker configuration already contains a credHelper
entry, it will be overwritten.


Example of a typical workflow with GCR:

```

# Build the container locally
docker build -t gcr.io/qwiklabs-gcp-03-f5bdb4d76b55/omega-trade/backend:v1 -f dockerfile.prod .

# Configure docker 'credHelpers'
gcloud auth configure-docker

# Push the container to the remote registry
docker push gcr.io/qwiklabs-gcp-03-f5bdb4d76b55/omega-trade/backend:v1

# Deploy the container to a Cloud Run instance
gcloud run deploy omegatrade-backend --platform managed --region us-east4 --image gcr.io/qwiklabs-gcp-03-f5bdb4d76b55/omega-trade/backend:v1 --memory 512Mi --allow-unauthenticated


```