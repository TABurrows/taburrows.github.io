---
title: Authorization Code with PKCE
category: Auth0
order: 1
---
Authorization Code Flow with Proof Key for Code Exchange (PKCE)

Use this Grant Type for applications that CANNOT store a Client Secret eg. Public Clients such as Native Apps and Single-Page Apps

For Public Clients, Authorization Code Flow alone is not appropriate because:
Native Apps
- Decompiling a Public Client will reveal the Client Secret (which is bound to the App and is the same for all Users and Devices)
- Custom URL Schemes such as `MyApp://` can potentially allow malicious apps to receive an Authorization Code from your Authorization Server