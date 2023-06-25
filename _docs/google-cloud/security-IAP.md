---
title: Security - Identity Aware Proxy
category: Google Cloud
order: 1
---
Security - Identity Aware Proxy

IAP is an enterprise security model that enables every employee to work from untrusted networks without the use of a VPN.

IAP provides a central authentication and authorization layer for your applications over HTTPs.

IAP replaces end-user VPN tunnels or the need to apply an authentication and authorization layer in front of a web application hosted on Google Cloud.

At Google, IAP is used to control access to internal applications without the need to use end-user VPNs.

How it works:
A reverse proxy sits in front of every data request.
Whenever you attempt to log into an application, your request is forward to IAP which requires the user to log in.
Once logged in, the Proxy will determine if the user is allowed to access that Application.
If Authorization is obtained for the user, they are then forwarded to the requested application page.
[ nb. the proxy needs to have near zero latency to provide "invisible" security ]

IAP lets you manage access to App Engine instances, Compute Engine instances and GKE Clusters with a Central Authentication and Authorization layer for your applications over HTTPS.

IAP provides context-aware access for SSH and RDP which allows you to control access to VMs based on a User's Identity and Context (including device security status, location, etc.)

IAP also supports web-apps that even run outside Google Cloud.

IAP provides a much simpler administration process and with reduced operational overhead than more traditional VPN Solutions.


Practical Steps:
- Set up OAuth Consent
- Set up OAuth Access Credentials
- Set up IAP Access for the deployed Application
- Use IAP to restrict access to the Application