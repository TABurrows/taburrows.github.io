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

The `HOST_PORT` and the `CONTAINER_PORT` are defined in the `ports:` seciont of a service in `compose.yaml` in the form `HOST_PORT:CONTAINER_PORT`.

The `HOST_PORT`s exposed  in the following `compose.yaml` are `8000` for the `web` service and `8001` for the `db` service.

```yaml
services:
  web:
    build: .
    ports:
      - "8000:8000"
  db:
    image: postgres
    ports:
      - "8001:5432"
```

Reference containers by name rather than IP whenever possible as configuration changes can force a container rebuild with the same name but a new IP address.

### Custom Networks

You can specify networks rather than using the default app network, with the top-level `networks` key.

In this `compose.yaml` the `proxy` service is isolated from the `db` service, because they do not share a network in common.  Only the `app` service can talk to both.

```yaml
services:
  proxy:
    build: ./proxy
    networks:
      - frontend
  app:
    build: ./app
    networks:
      - frontend
      - backend
  db:
    image: postgres
    networks:
      - backend

networks:
  frontend:
    # Specify driver options
    driver: bridge
    driver_opts:
      com.docker.network.bridge.host_binding_ipv4: "127.0.0.1"
  backend:
    # Use a custom driver
    driver: custom-driver
```