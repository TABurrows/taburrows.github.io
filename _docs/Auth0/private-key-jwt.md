---
title: Authenticating with Private Key JWT
category: Auth0
order: 1
---
Authenticating with Private Key JWT


nb. Your Auth0 App needs to be configure for Private Key JWT Authentication < https://auth0.com/docs/get-started/applications/configure-private-key-jwt >

You need to complete two steps when authenticating with `private_key_jwt`:

1. Build the CLIENT ASSERTION
    This assertion is a JWT Signed by Private key when you generated the key pair. 
    How to generate a key pair: < https://auth0.com/docs/get-started/applications/configure-private-key-jwt >

2. Authentciate with the Assertion against Auth0




