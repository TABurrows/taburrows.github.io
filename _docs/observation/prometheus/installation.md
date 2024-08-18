---
title: Installation
category: Prometheus
order: 1
---
Installation

[ This example, Debian 11 ]

Add the prometheus user and group:

```
sudo groupadd --system prometheus
sudo useradd -s /sbin/nologin --system -g prometheus prometheus
```

Build the directory structure in /var/lib:

```
sudo mkdir /var/lib/prometheus


```

Build the config directory structure:

```
sudo mkdir -p /etc/prometheus/rules
sudo mkdir -p /etc/prometheus/rules.d
sudo mkdir -p /etc/prometheus/files_sd

```

or:

```
for i in rules rules.d files_sd; do sudo mkdir -p /etc/prometheus/${i}; done
```

Download a specific release from github.com/prometheus/prometheus/releases with wget:

```
mkdir -p /tmp/prometheus && cd $_
wget https://github.com/prometheus/prometheus/releases/download/v2.37.8/prometheus-2.37.8.linux-amd64.tar.gz
```

or download the latest release with wget and curl:

```
mkdir -p /tmp/prometheus && cd $_
curl -s https://api.github.com/repos/prometheus/prometheus/releases/latest | grep browser_download_url | grep linux-amd64 | cut -d '"' -f 4 | wget -qi -
```

Unpack the tarball:

```
tar -zxvf prometheu*.tar.gz
```

Install the binaries:

```
sudo mv prometheus promtool /usr/local/bin/
```

Install the config artifacts:

```
sudo mkdir -p /etc/prometheus 
sudo mv consoles/ console_libraries/ /etc/prometheus/
```

Install the sample yml config file:

```
sudo mv prometheus.yml /etc/prometheus
```

Setup permissions for the 'prometheus' user/group along with privileges:

```
sudo chown -R prometheus:prometheus /etc/prometheus
sudo chmod -R 755 /etc/prometheus
sudo chown -R prometheus:prometheus /var/lib/prometheus
```

Create the systemd service unit file - sample:

```
sudo tee /etc/systemd/system/prometheus.service<<EOF
[Unit]
Description=Prometheus
Documentation=https://prometheus.io/docs/introduction/overview/
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=prometheus
Group=prometheus
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/var/lib/prometheus \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries \
  --web.listen-address=0.0.0.0:9090 \
  --web.external-url=

SyslogIdentifier=prometheus
Restart=always

[Install]
WantedBy=multi-user.target
EOF
```

On-boot enable and start the service:

```
sudo systemctl daemon-reload
sudo systemctl enable prometheus
sudo systemctl start prometheus
sudo systemctl status prometheus
```

Check the system is running at http://`<ip-address-or-host-name>:9090`

![Prometheus Landing Page](/images/prometheus.png)
