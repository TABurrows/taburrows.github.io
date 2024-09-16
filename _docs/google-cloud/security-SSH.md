---
title: Security - VM Login
category: Google Cloud
order: 1
---
Security - VM Login


RDP for Windows Hosts: needs a Username and Password

SSH: no password, only key exchange

For console.cloud.google.com SSH access, the browser connects to a Google Web Server via HTTPS then on to the Guest via SSH.  SSh Keys are generated automatically and propagated to the instance during this process.  For this to work, the VM must hava a Public IP Address and a Firewall Rule to allow TCP:22 from Google's Servers.

possible to connect to a Linux instance via SSH using Gcloud SDK.

Once you have the Cloud SDK installed and configured, simple connect with the command:
```
gcloud compute ssh <instance-name> --zone <zone>
```
Running the above will automatically generate SSH keys and place a copy of them in your local/default/home .ssh folder.

If your VM Instance has no external IP Address, you need a firewall rule in place that allows IAP TCP forwarding traffic.

If you use Putty or alternative client, thee SSH keys in use are managed outside of Google Cloud. The PUB Key must be provided to the instance that you wish to AUTHENTICATE against (but the private key should stay in on-prem in the local/default/home .ssh folder).

A PUBLIC KEY can be provided to the VM Instance via the PROJECT METADATA. (accessed from the Cloud Console -> Compute Engine dashboard -> "Add Item" options and upload public key)

By default all keys added to the PROJECT METADATA are available to ALL VMs in the project. To disable this, configure individual VMs to NOT use project-wide keys.
Use "Block project-wide SSH keys" to enable this restriction.

SSH keys can also be added to INSTANCE-SPECIFIC metadata and will only be available to that instance.

Bastion Hosts:
- Harden
- Limit the source IPs abe to connect
- Only allow SSH traffic to private instances from the bastion

Better: use a VPN

Another solution: use IAP TCP forwaring (establishes an encrypted tunnel over which you can forward SSH/RDP etc to VM Instances)

Identity Aware Proxy IAP:
Creates a listening port on the local host that forwards all traffic to a specified instance.  IAP then wraps all traffic from the client in HTTPS.  Users gain access to the Interface and Port if they pass the AUTHENTICATION and AUTHORIZATION check of the targer resources IDENTITY AND ACCESS MANAGEMENT IAM POLICY. IAP TCP forwarding allows you to establish an encrypted tunnel over which you can forward traffic to VM instances.


Windows:
```
gcloud compute reset-windows-password <instance-name> --user=<username>
```
Download an RDP file or connect with RDP Client to public IP.
Compute Engine automatically generates a random password for your Windows instance. Once you connect, change this.