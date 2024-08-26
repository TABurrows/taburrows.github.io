---
title: Authorization Code with PKCE
category: Auth0
order: 1
---
Authorization Code Flow with Proof Key for Code Exchange (PKCE)

Use this Grant Type for applications that CANNOT store a Client Secret eg. Public Clients such as Native Apps and Single-Page Apps

For Public Clients, Authorization Code Flow alone is not appropriate because:
Native Apps Limitations
- Decompiling a Public Client will reveal the Client Secret (which is bound to the App and is the same for all Users and Devices)
- Custom URL Schemes such as `MyApp://` can potentially allow malicious apps to receive an Authorization Code from your Authorization Server
Single-Page Apps Limitations
- Cannot securely store a Client Secret because their entire source is available in the browser

To address these scenarios, OAuth 2.0 provides Authorization Code Flow with Proof Key for Code Exchange (PKCE) (OAuth 2.0 - RFC 7636)

The PKCE-Enhanced Authorization Code Flow introduces a secret created by calling the application that can be verified by the Authorization Server.
This secret is called the `Code Verifier`.

Additionally the Calling Application creates a transform value of the `Code Verifier` called the `Code Challenge` and sends this value over HTTPS to retrieve an Authorization Code.  This way, a malicious attacker can only intercept the `Authorization Code`, and they cannot exchange it for a token without the `Code Verifier`.

There are common steps between the `Authorization Code Flow` and the `Authorization Code Flow with PKCE`.

![OAuth2.0 - Authorization Code Grant](/images/AUTH0/AUTH-CODE-FLOW-w-PKCE.png)

1. The User interacts with the 'Login' prompt

2. Auth0's SDK creates a Cryptographically-random `code_verifier` and from this generates a `code_challenge`

3. Auth0's SDK redirects the user to the tenant's Auth0 Authorization Server ( `/authorize` endpoint )

4. The tenant's Auth0 Authorization Server redirects the user to the login and authorization prompt

5. The User Authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the Application

6. The tenancy's Auth0 Authorization Server STORES the `code_challenge` and redirects the User back to the application with an Authorization `code` (one-time use only)

7. Auth0's SDK sends this `code` and the `code_verifier` (from 2) to the tenancy's Auth0 Authorization Server `/oauth/token` endpoint

8. the tenancy's Auth0 Authorization Server verifies the `code_challenge` and `code_verifier`

9. the tenant's Auth0 Authorization Server responds with an 'ID Token' and an 'Access Token' (and optionally, if the required parameters so request, a 'Refresh Token')

10. Your application can use the 'Access Token' to call an API to access information about the user

11. The API responds with requested data in response to a valid 'Bearer Token' (eg. the 'Access Token' from 10)



::: NOTE
Advancements in User Privacy Controls in browsers adversely impacts the User Experience by preventing access to 3rd Party Cookies. As such BROWSER-BASED FLOWS *MUST* user `Refresh Token Rotation` which provides a Secure Method for uisng Refresh Toksn in SPAs whilst still providing a seamless UX. (ITP = Intelligent Tracking Prevention)
:::