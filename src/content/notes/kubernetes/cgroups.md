---
title: "Kubernetes: Linux cGroups"
summary: "An overview of the Linux cGroups in Kubernetes"
tags: [ "Containers", "Kubernetes", "Linux cGroups" ]
---

## Notes


To check which cgroup version your distribution uses, run the stat -fc %T /sys/fs/cgroup/ command on the node:

```
stat -fc %T /sys/fs/cgroup/
```

For cgroup v2, the output is cgroup2fs.

For cgroup v1, the output is tmpfs.

