---
title: Authentication and Authorization Flows
category: Auth0
order: 1
---


## Authentication and Authorization Flows

Terms for OAuth2.0:
- Resource Owner (usually Client)
- Resource Servers

nb. If you have an application that needs to talk to different RESOURCE SERVERS, then multiple executions of the same or different AUTHORIZATION FLOWs need to take place against the `/authorize` endpoint - just ensure they have a different `audience` value.  This will result a DIFFERENT access token at the end of each flow.


User the `Authentication API Debugger Extension` to try endpoints - detailed instructions per `/grant`


### Client Credentials Flow

Use when:
- Client is the Resource Owner eg. machine-to-machine authorization (so no end-user authorization is needed), cron job that calls an API


### Authorization Code Flow

(optional Refresh Token) Use when:
- Client is a Web App executing on a Server eg. no Web Browser = lower risk of exposure


### Authorization Code with PKCE

Authorization Code Flow with Proof Key for Code Exchange (PKCE) [can be implemented with the Auth0 SPA SDK high-level API]
This flow can return Refresh Tokens.
This flow has advantages over the `Implicit Flow with Form Post` for SPAs including Refresh Tokens and Access Tokens not being exposed on the Client side.
- SPAs
- Native Application
- Mobile Application


### Resource Owner Password Flow

Involves, usually, a Web Form and the Username / Password credentials are sent to a Backend and from there to Auth0 for authorization.
Use when:
- Client is absolutely trusted with User Credentials and `Authorization Code Flow` is not possible