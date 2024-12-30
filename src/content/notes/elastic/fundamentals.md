


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
