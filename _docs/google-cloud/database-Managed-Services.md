---
title: Database - Managed Services
category: Google Cloud
order: 1
---
Database - Managed Services


When you build a Google Managed SQL Service you get a choice of 'Public IP' or 'Private IP'.  

If you choose 'Private IP', Google automatically creates a Network Peering between the Customer's network (which you specify) and Google's Network where the the Managed Cloud SQL instance will be running.

( nb. once you choose 'Private IP' you can not disable it )

After the Private IP is enabled, machines in the Customer's Peered Network can communicate without needing a Public IP Addres. You can clear the Public IP option and the server will not be given one.

A Cloud SQL instance will be in Google's own managed network and you may need to allow resources in the Customer's Project to connect to that Google Cloud SQL instance. In that case, you could choose a Private IP to do that ("This instance will use the existing managed service connection")

If you choose to enable a Public IP, the DB is protected by Firewall Rules instead. By default only applications in the current project can access the DB. You authorize one or more additional networks using IP Addresses or ranges (as you would with a firewall rule). Create a VPN or Cloud Interconnect to connect networks outside of Google Cloud eg. for on-prem.

