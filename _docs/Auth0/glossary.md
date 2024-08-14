---
title: Glossary
category: Auth0
order: 1
---

`Access Token`- an Authorization Credential in the form of an Opaque string or JWT used to access an API

`Client ID` - Identification value given to your registered resource from Auth0

`Client Secret` - Secret used by a client (application) to authenticate with the Authorization Server; it should be known only by the Client and the Authorization Server and must be sufficiently random to not be guessable

`Authorization Server` - a Centralized Server that contributes to defining the Boundaries of a User's Access.  For example, you authorization server can control the Data, Tasks and Features available to a User

`OAuth` - OAuth 2.0 is an Authorization framework that defines Authorization Protocols and Workflows (does not provide Authentication, this is most common added as an OIDC layer that is an extension to OAuth 2.0 that provides Authentication)

`Custom Domains` - 3rd party domain with a specialized, or vanity domain name - used with Universal Login to provide centralized Authentication

`Single Sign-On (SSO)` - a service that, after a user logs into one application, automatically logs that user in to other applications

`Identity Provider (IdP)` - a service that stores and manages digital identities

`OpenID` - the Open standard for authentication that allows applications to verify users' identities without collecting and storing login information

`Passwordless`- a form of authentication flow that does not rely on a password as the first factor

`Token Endpoint` - the endpoint on the Authorization Server that is used to programmatically request tokens

`SAML` - Security Assertion Markup Language is an XML based standardized protocol allowing two parties to exchange authentication information without a password

`Universal Login` - your application redirects to Universal Login, hosted on Auth0's Authorization Server, to a verify a User's Identity