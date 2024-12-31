---
title: "Elastic: Stack Fundamentals"
summary: "The fundamentals of the Elastic stack."
tags: [ "Elastic", "Fundamentals" ]
---


## Set Password

The `elastic` user is the superuser and its password can be set on the CLI:

```
bin/elasticsearch-reset-password -u elastic
```

Use the generated password to login as `elastic` on the kibana UI at `http://localhost:15601`.


## Kibana Connectivity

To generate a token for Kibana, run the `elasticsearch-create-enrollment-token` command on the elasticsearch CLI with the right scope:

```
# For elastic kibana
bin/elasticsearch-create-enrollment-token -s kibana
```

Use the generated token in the Kibana UI to establish a trusted connection.

If prompted for a verification code, open the Kibana instance's terminal and get a code:

```
bin/kibana-verification-code
```


## Node Connectivity


To generate a token for other Search nodes, run the `elasticsearch-create-enrollment-token` command on the elasticsearch CLI with the right scope:

```
# For elastic nodes
bin/elasticsearch-create-enrollment-token -s node
```


## Logstash Connectivity

Copy the Elasticsearch `http_ca.crt` file from the `/etc/elasticsearch/certs/http_ca.crt` location and on to the logstash image `/usr/share/logstash/elasticsearch/http_ca.crt`.

Then configure the logstash pipeline to use this certificate in the `pipeline.yml` - this example for Apache log format:

```
input {
  file {
    path => "/tmp/apache_log"
    start_position => "beginning"
  }
}

filter {
  if [path] =~ "access" {
    mutate { replace => { "type" => "apache_access" } }
    grok {
      match => { "message" => "%{COMBINEDAPACHELOG}" }
    }
  }
  date {
    match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]
  }
}

output {
  elasticsearch {
    hosts => ["https://172.30.0.3:9200"] 
    ssl_certificate_authorities => ["/usr/share/logstash/elasticsearch/http_ca.crt"]
  }
  stdout { codec => rubydebug }
}
```

https://www.elastic.co/guide/en/logstash/current/ls-security.html




Then recreate the logstash container:

```
docker compose up --force-recreate logstash
```