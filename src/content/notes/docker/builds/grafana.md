---
title: "Docker: Grafana + InfluxDB + Telegraf"
summary: "Building a Docker network running a solution based on Grafana, Telegraf and InfluxDB"
tags: [ "Docker", "Grafana", "Telegraf", "InfluxDB" ]
---

This solution builds a Docker network running Grafana, Telegraf and InfluxDB.

## Image Files

Create the Image files for applications.

```
<base-directory>
 └── images
    └── grafana
        └── Dockerfile
```

Pull your preferred image from your preferred repository.

```
# Dockerfile
# FROM repository/image:version
# FROM docker.io/grafana/grafana
FROM grafana/grafana
```

## Docker Compose

The Docker Compose file defines three applications including the Grafana and InfluxDB servers.

```

```