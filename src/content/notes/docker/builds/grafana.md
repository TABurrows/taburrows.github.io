---
title: "Docker: Grafana + InfluxDB + Telegraf"
summary: "Building a Docker network running a solution based on Grafana, Telegraf and InfluxDB"
tags: [ "Docker", "Grafana", "Telegraf", "InfluxDB" ]
---

This solution builds a Docker network running Grafana, Telegraf and InfluxDB.

## Image Files

Create the Image files for applications and an empty `compose.yml` file.

```
.
├── images
│   ├── grafana
│   │   └── Dockerfile
│   └── influxdb
│       └── Dockerfile
└── compose.yml
```

Pull your preferred image from your preferred repository.

```
# grafana/Dockerfile
FROM docker.io/grafana/grafana
```

```
# influxdb/Dockerfile
FROM docker.io/influxdb
```

## Docker Compose

The Docker Compose file defines the services that go up to make the solution. This will include the Grafana and InfluxDB instances built from the above Dockerfile image definitions.

The docker compose YAML file:

```yaml
# compose.yml
services:
    dashboard:
        build: ./images/grafana
        ports: 
          - "13000:3000"
        networks:
            - grafana
    timeseries:
        build: ./images/influxdb
        ports:
          - "18086:8086"
        networks:
            - grafana
networks:
    grafana:
        driver: bridge
```


To run the docker containers:

```
# In the foreground of the terminal:
docker compose up
# In the background:
docker composer up -d
# Or:
docker compose up --detach
```

To force docker to stop all containers and recreate them:

```
docker compose up --force-recreate
```

To stop the containers:

```
docker compose stop
```

To start the containers:

```
docker compose start
```

To stop and remove containers, volumes, networks and images created in `docker compose up`:

```
docker compose down
```