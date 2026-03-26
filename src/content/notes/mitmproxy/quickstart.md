---
title: "mitmproxy: quickstart to running the proxy"
summary: "Quickstart for running the interactive HTTPS proxy mitmproxy"
tags: [ "mitmproxy" ]
---

Intercept, inspect, modify and replay HTTP/1, HTTP/2, HTTP/3, WebSockets or other TLS payloads including HTML and Protobuf. www.mitmproxy.org


## Installation - Mac OS X

To install mitmproxy locally on a Mac with brew:

```
brew install mitmproxy
```

To Run:

```
mitmproxy
```

### Command Line Usage

Command line usage with:

```
http_proxy=http://localhost:8080/ curl http://example.com/
https_proxy=http://localhost:8080/ curl -k https://example.com/
```

## Docker Container

Can be used with HTTP/1, HTTP/2 and Websockets

```
docker run --rm -it -v ~/.mitmproxy:/home/mitmproxy/.mitmproxy -p 8888:8888 mitmproxy/mitmproxy
```

To start mitmdump from the Docker Container:

```
docker run --rm -it -p 8080:8080 mitmproxy/mitmproxy mitmdump
```


### Docker Container Usage

Docker container With curl:

```
http_proxy=http://localhost:8888/ curl http://example.com/
https_proxy=http://localhost:8888/ curl -k https://example.com/
```


## Certificate Download

Start `mitmproxy` from the CLI and configure your browser with the necessary proxy settings eg. `export http_proxy=http://localhost:8080/` then in the browser visit `mitm.it` and follow the instructions.

This certificate will ensure you avoid certificate chain errors.

