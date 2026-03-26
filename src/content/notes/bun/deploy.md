---
title: "Bun: Deploy"
summary: "Bun: deploy Bun projects"
tags: [ "Bun", "React" ]
---



## Google Cloud Run

To run a Bun project on Cloud Run:

```
# Define target project values
PROJECT_ID=$(gcloud projects list --format='value(projectId)' --filter='name="My Project Name"')
PROJECT_NUMBER=$(gcloud projects list --format='value(projectNumber)' --filter='name="My Project Name"')

# Enable the Google APIs for building the and deploying the project
gcloud services enable run.googleapis.com cloudbuild.googleapis.com

# Define IAM Policy Bindings for the deployment process
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com \
  --role=roles/run.builder
```


Create the `Dockerfile` for Cloud Run:

```
# Use the official Bun image to run the application
FROM oven/bun:latest

# Copy the package.json and bun.lock into the container
COPY package.json bun.lock ./

# Install the dependencies
RUN bun install --production --frozen-lockfile

# Copy the rest of the application into the container
COPY . .

# Run the application
CMD ["bun", "index.ts"]
```


Create the `.dockerignore` file for Cloud Run:

```
node_modules
Dockerfile*
.dockerignore
.git
.gitignore
README.md
LICENSE
.vscode
.env
# Any other files or directories you want to exclude
```

Deploy the Cloud Run service:

```
gcloud run deploy my-bun-app --source . --region=europe-west2 --allow-unauthenticated
```


Successful deployment can be established by visiting:

```
https://my-bun-app-....europe-west2.run.app
```