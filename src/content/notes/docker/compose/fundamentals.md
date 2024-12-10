---
title: "Docker: Docker Compose Fundamentals"
summary: "An overview of the fundamentals of Docker Compose"
tags: [ "Docker", "Compose", "Fundamentals" ]
---

Docker Compose allows for the defining and running of multi-container applications that can be managed as one entity.

Lifecycle commands to:

- Start, stop and rebuild services
- View the status of running services
- Stream the log outpu of running services
- Running one of commands against a service

## Defining Services

Services are defined in a `compose.yaml` file.  In the example below, two services are defined one called `web` and another `redis`.

```yaml
services:
    web:
        build: .
        ports:
            - "8000:5000"
    redis:
        image: "redis:debian"
```


## Controlling Services

Services defined in a `compose.yaml` file can be started by running `docker compose up`.

Or to run the defined services in the background `docker compose up -d`.

To stop the services from the command is `docker compose stop`.

## Splitting Services

You can split services across multiple files and include them in the `compose.yaml` with:

```yaml
include:
    - infra.yaml
services:
    web:
        build: .
        ports:
            - "8000:5000"
...
```

## Develop Services

You can watch a project directory for changes and automatically rebuild on changes with `docker compose watch` or `docker compose up --watch`.

## Networking Services

By default, the network name is based on the directory with the `compose.yaml`.  To override the project name, use either the `--project-name` flag or the `COMPOSE_PROJECT_NAME` environment variable.