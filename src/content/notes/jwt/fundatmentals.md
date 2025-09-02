---
title: "JWT: Fundatmentals"
summary: "An introduction to JSON Web Tokens"
tags: [ "JWT" ]
---

Some JWT notes:

- JWT is a JSON Web Token and is pronounced "jot". JSON objects support human-readable text and are used in many applications, such as with NoSQL databases.

- You should not trust a JWT unless it is cryptographically signed.

- For authorization, a captured JWT can be replayed and "played back" to provide a malicious entry or rights into a system.

- JWTs should never be trusted before their issue date and their not-before date and never trusted after their expiry.

- JWTs have been defined as an RFC standard with RFC7519.

- The format is URL friendly and is Base64URL encoded.

- A JWT token has three main parameters separated by a period ("."), and which are the header, the payload and the signature.

- The header is typically not encrypted and defines the signature algorithm ("alg") and the type ("typ").

- The payload is typically not encrypted and uses a Base64 format. The payload can typically be seen by anyone who captures it.

- "ey" is a typical field starting part of a parameter in the header and body of a token as `{"` encoded in Base64 is "ey==". You can tell if a token is not encrypted with an "ey" as the start of the header and body parameters.

- The registered claims of a token are iss (Issuer), sub (Subject), aud (Audience), iat (Issued At), exp (Expires), nbf (Not Before), and jti (JWT ID).

- The claim fields are not mandatory and just a starting point for defining claims.

- A claim is asserted about a subject, and where we have a claim name and a claim value in a JSON format.

- With an HMAC signature, the issuer and validator must share the same secret symmetric key.

- If you use HMAC to sign the tokens, a breached secret key will compromise the signing infrastructure.

- The two main public key signing methods are RSA and ECDSA.

- The time of a token is represented as the number of seconds from 1 January 1970 (UTC).

- Each day of a JWT token is represented by 86,400 seconds.

- An unsecured JWT does not have encryption or a signature. This is bad! it is represented in the header parameter with an "alg" of "none" and an empty string for the JWS Signature value.

- A JWT can be encrypted (but this is optional). For public key methods, we can use either RSA and AES, or we can use a wrapped key.