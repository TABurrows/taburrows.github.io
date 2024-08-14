---
title: Identity Provider Access Tokens
category: Auth0
order: 1
---
Identity Provider Access Tokens


Identity Providers issue Third-Party Access Tokens after Users Authenticate with that Provider.

You can use these Tokens to call the Issuer's API.  eg. you can use a Facebook issued Access Token to call the Facebook Graph API.

For individual users, the Identity Provider Tokens are available in the `identites` array on the `user` object under the element of the particular connection.

To securely access tokens for a specific user, you need an ACCESS TOKEN for the MANAGEMENT API that includes the `read:user_idp_tokens` scope/permission. Then you can make an HTTP GET call to the GET A USER ENDPOINT (eg. https://login.auth0.com/api/v2/users/:id ) to retrieve the tokens.

## Renewing Third-Party Tokens

There is no standard way to renew Identity Provider Access Tokens through Auth0 - it varies for each supported provider.

For certain identity providers, Auth0 can store a REFRESH TOKEN:

- BitBucket

- Google OAuth 2.0 (pass the parameter `access_type=offline` as well as the `connection_scope` parameter with required scopes when calling the Auth0 `/authorize` endpoint)

- Sharepoint

- Azure AD

- Other OAuth 2.0 compliant Identity Provider