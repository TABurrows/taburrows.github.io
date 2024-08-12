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


## Build the Assertion

Options to build an Assertion:
- Use Auth0's SDKs
- Construct one yourself

nb. All claims are required unless otherwise stated

A JWT Assertion is made up of the following `properties` and `claims`:
HEADER:
    - `alg` - the signing algorithm - must match the algorithm used in creating your Application Credential
    - `kid` - (optional) the Auth0 generated Key ID of the credential - created when the credential is created
PAYLOAD:
    - `iss` - the 'issuer' Claim should contain the Auth0 App's Client ID found in the Auth0 Application's Settings Dashboard > Applications > Applications > Settings
    - `sub` - the 'subject' Claim should also contain the Auth0 App's Client ID
    - `aud` - the 'audience' Claim should container the URL of the Auth0 Tenant or Custom Domain that receives the Assertion eg. https://tab-dev.auth0.com/ (including the trailing slash)
    - `iat` - (optional) the 'issued at' Claim should be set to a valid timestamp
    - `exp` - (optional) the 'expiration' Claim should be set to a valid timestamp
    The Client Assertion is a ONE-TIME USE TOKEN and we recommend the SHORTEST POSSIBLE EXPIRY TIME. Auth0 supports a Maximum of 5 minutes for the lifetime of a token but the RECOMMENDED Expiry time is ONE MINUTE.
    - `jti` - a Unique Claim ID created by the client. It is recommended to use the UUID (Universally Unique Identifier) format for this value


Once the JWT Assertion has been created, then it should be signed with the PRIVATE KEY generated for the purpose.

A list of supported libraries is available at JWT.io - it is recommended to use a library or standard tooling for this process rather than do it yourself.



### Example

This example uses the Node.JS package call `jose` to generate the JWT Assertion: 
[ https://github.com/panva/jose ]

```
const { SignJWT } = require('jose')
const crypto = require("crypto");
const uuid = require("uuid");

async function main() {
 const privateKeyPEM = crypto.createPrivateKey(/**
   Read the content of your private key here. We recommend to store your private key
   in a secure infrastructure. 
 */);

 const jwt = await new SignJWT({})
   .setProtectedHeader({ 
      alg: 'RS256', // or RS384 or PS256
      kid: '(OPTIONAL) KID_GENERATED_BY_AUTH0' 
   })
   .setIssuedAt()
   .setIssuer('CLIENT_ID')
   .setSubject('CLIENT_ID')
   .setAudience('https://YOUR_TENANT.auth0.com/') // or your CUSTOM_DOMAIN
   .setExpirationTime('1m')
   .setJti(uuid.v4())
   .sign(privateKeyPEM);
  console.log(jwt)
}

main();
```





