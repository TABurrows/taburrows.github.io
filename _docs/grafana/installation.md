---
title: Installation
category: Grafana
order: 1
---
Installation (OSS - SQLite 3 - APT)

Install dependencies
```
sudo apt-get install -y apt-transport-https
sudo apt-get install -y software-properties-common wget
sudo wget -q -O /usr/share/keyrings/grafana.key https://apt.grafana.com/gpg.key
```

Add the repository
```
echo "deb [signed-by=/usr/share/keyrings/grafana.key] https://apt.grafana.com stable main" | sudo  tee -a /etc/apt/sources.list.d/grafana.list
```

Install from repository
```
sudo apt-get update
sudo apt-get install grafana
# for enterprise version:
# sudo apt-get install grafana-enterprise
```

Start the server
```
sudo systemctl daemon-reload
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
sudo systemctl status grafana-server
```

Simple test (admin/admin on first use)
```
http://<server-ip-address>:3000
```

Add Data Source
```
Menu -> Connections -> Connect data
```
