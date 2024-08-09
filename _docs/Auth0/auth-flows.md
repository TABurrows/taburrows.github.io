---
title: Authentication and Authorization Flows
category: Auth0
order: 1
---


## Authentication and Authorization Flows

Terms for OAuth2.0:
- Resource Owner (usually Client)
- Resource Servers


### Authorization Code Flow

### Authorization Code with PKCE

Authorization Code Flow with Proof Key for Code Exchange (PKCE) [can be implemented with the Auth0 SPA SDK high-level API]
- Native Application
- Mobile Application


nb. If you have an application that needs to talk to different RESOURCE SERVERS, then multiple executions of the same or different AUTHORIZATION FLOWs need to take place against the `/authorize` endpoint - just ensure they have a different `audience` value.  This will result a DIFFERENT access token at the end of each flow.


User the `Authentication API Debugger Extension` to try endpoints - detailed instructions per `/grant`