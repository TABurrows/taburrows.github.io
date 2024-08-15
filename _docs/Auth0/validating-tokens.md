---
title: Validating Tokens
category: Auth0
order: 1
---


## Validating JSON Web Tokens

JSON Web Tokens are used for Secure Data Transmission, Authentication and Authorization. They should be Parsed and Validated in Regular Web, Native and SPA applications to determine integrity, signature authenticity, tampering, misuse, expiration, structure, claims to assure the least amount of risk


### Signature Authenticity

When validating a JWT, generally, the Current Hash Value and the original Hash Value are Parsed, or Decoded, then compared to verify the Token Signature is Authentic.  

The Backend API Quickstarts use SDKs that perform JWT Validation and Parsing for you, otherwise to perform a Parse and Validate:
- use any existing middleware for your Web Framework
- Choose a 3rd Party Library from JWT.io (check which libraries support validating All JWT claims)
- Manually implement the checks describes in RFC 7519 > 7.2 Validating a JWT ( https://tools.ietf.org/html/rfc7519#section-7.2 )

nb. when using 3rd party libraries look for the `jwt.verify()` method, as opposed to the 'jwt.decode()' or similar

nb. when using 3rd party llibraries look for `JsonWebTokenError` errors returned from method calls especially the `jwt malformed` message - you MUST reject the request associated with any JWT returning this error

nb. you can get the Public Key from your tenancy at the JWKS URL: `https://{your-auth0-tenancy}/.well-known/jwks.json`

Manually checking JWTs is discouraged.




## Validating ID Tokens

An ID Token, which are typically used for UI Display/Experience, is a JWT.

nb. if any of these checks fail, then token is invalid and the request must be rejected

1. Validate the JWT (see above)

2. Check additional `Claims`.  By performing step 1, you have already decoded the JWTs Payload and verified its `Standard Claims`.  Additional `Claims` that you may want to verify include:
    - `Token Audience (aud)` - [string] the audience value for the Token must match the `Client ID` of the Application as defined in Auth0 Settings
    - `Nonce (nonce)` - [string] passing a Nonce in the Token request is recommended (and required for Implicit Flow) to help prevent `Relay Attacks`.  The `nonce` value in the token must exactly match the original nonce sent in the request. (see 'Replay Attack Mitigation')


## Validating Access Tokens

An `Access Token` is meant for an API and should be validated ONLY by the API for which it was intended.

You do NOT need to validate Identity Provider (IdP) Access Tokens as there is no single way to do this (they are also often opaque)

nb. if any of these checks fail, then token is considered invalid and the request MUST be rejected with `401 Unauthorized`

1. Validate the JWT (see above)

2. Verify TOKEN AUDIENCE CLAIMS. By performing step 1, you have already decoded the JWTs Payload and verified its `Standard Claims`. The `Token Audience Claim (aud)` [array of strings] depends on the Initial Token Request.  The `aud` field could contain both an 'Audience' corresponding to your custom API and an 'Audience' corresponding to the `/userinfo` endpoint.  At least ONE of the 'Audience' values for the Token MUST MATCH the Unique Identifier for the Target API as defined in your Auth0 Settings Dashboard (in the `Identifier` field) 

3. Verify PERMISSIONS (SCOPES). Verify that the Application has been GRANTED THE PERMISSIONS required to access your API. To do so, you need to check the `scope` claim [space-separated list of strings] in the decoded JWT's payload.  It should match the permissions required for the endpoint being accessed. For example, if your custom API provides three endpoints to READ, CREATE or DELETE a USER RECORD, when you registered your API with Auth0, you would create 3 corresponding 'permissions':

    - `create:users` provides access to the `/create` endpoint
    - `read:users` provides access to the `/read` endpoint
    - `delete:users` provides access to the `/delete` endpoint

Therefore if the Application requests access to the `/create` endpoint, but the Access Token's `scope` claim does not contain the necessary permission of `create:users`, then the API must reject the request.