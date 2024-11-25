---
title: "Google Cloud: Add numpy support to gcloud"
summary: "How to add numpy support to the gcloud command line tool."
tags: [ "Google Cloud", "numpy", "gcloud" ]
---

If you use IAP tunnels to connect to Private Google Cloud instances you may find that the `gcloud` command line tool requires `numpy` to be installed.

To install numpy with gcloud's built-in python environment:
```
$(gcloud info --format="value(basic.python_location)") -m pip install numpy
```

If warnings still appear, update the fallen behind numpy version:
```
$(gcloud info --format="value(basic.python_location)") -m pip install numpy --upgrade --break-system-packages
```