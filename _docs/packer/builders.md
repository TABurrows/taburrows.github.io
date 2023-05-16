---
title: Builders
category: Packer
order: 1
---

Builders create machines and generate images for platforms (although some builders perform helpers tasks eg running provisioners)

Packer has the following builders:
- Plugin: eg GCE, VirtualBox
- File: creates an artifact from file
- Null: runs provisioners over SSH

There are also Custom and Community Supported builders.

```
packer {
    required_plugins {
        docker = {
            version = ">= 0.0.7"
            source = "github.com/hashicorp/docker"
        }
    }
}

source "docker" "ubuntu" {
    image = "ubuntu:xenial"
    commit = true
}

build {
    name = "packer-ubuntu"
    sources = [
        "source.docker.ubuntu"
    ]
}
```