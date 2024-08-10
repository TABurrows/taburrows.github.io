---
title: Authorization Code Grant
category: Auth0
order: 1
---
Authorization Code Grant


( Authorization Code Grant = Authorization Code Flow )


![OAuth2.0 - Authorization Code Grant](/images/AUTH0/AUTH-CODE-FLOW.png)


- Great for Regular Web Apps that execute on the server (alternatively you can use the `Authentication API`)
- Can return an optional `Refresh Token`


Related Links:
- Add Login Using the Authorization Code Flow <https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow/add-login-auth-code-flow>
- Call Your API Using the Authorization Code Flow <https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow/call-your-api-using-the-authorization-code-flow>

Grant Flow:

1. End User launches `Login` process within the application

2. Auth0's SDK redirects user to Auth0 Authorization Server `/authorize` endpoint (the `Authorization URL`)

3. Auth Server redirects user to  `Login/Authorization prompt` eg. widget or application form

4. End User Authenticates using one of the configured login options, and may see a `Consent Prompt` listing the `Permissions` the application is seeking eg. read profile, read email address, get profile photo

5. Auth0 Authorization Server redirects user back to application with single-use `authorization_code` (this code will be exchanged for tokens later)

6. Auth0's SDK sends `authorization_code`, application's `client ID`, and application's `credentials` (eg. `Client Secret`, `Private Key JWT`) to Auth0's Authorization Server endpoint `/oauth/token`

7. Auth0 Authorization Server verifies `authorization code`, application's `client ID`, and application's `credentials` (eg. `Client Secret`, `Private Key JWT`)

8. Auth0 Authorization Server responds with an `ID Token` and `Access Token` and optionally a `Refresh Token`

9. Application can use the `Access Token` to call an API to access information about the End User

10. API responds with requested data to the now authenticated and authorized End User



### Login

On successful login, the application will have access to the user's `ID Token` and `Access Token`.  
- the `ID Token` contains basic user profile information
- the `Access Token` can be used to call the Auth0 `/userinfo` endpoint or your own Protected APIs


#### Login - Authorize User

First step in the Auth Code Grant Flow, is to GET THE USER'S AUTHORIZATION.

The steps to get the user's Authorization:
1. Authenticate the User
2. Redirect the User to an IdP to handle Authentication
3. Obtain User's CONSENT for the REQUESTED PERMISSION LEVEL (unless consent has already been given)

You can Authorize a User by calling the `Authorization URL`
eg. example `Authorization URL` call:
```
https://{your_auth0_domain}/authorize?
    response_type=code&
    client_id={client_id}&
    redirect_url={https://{your_redirect_domain/callback_path}&
    scope={scope}&
    state={state}
```

Parameters table

| Parameter | Description
| :--- | :--- |
| `response_type` | Denotes `code` or `token` (eg. access token) that Auth0 `/authorize` will return. For the AUTHORIZATION CODE GRANT FLOW the value should always be `code` |
| `client_id` | The Client ID value from Auth0's Application Settings |
| `redirect_uri` | The callback URI.  This must exist as an endpoint on the Regular Web App and it must be registered as a redirect URL in Auth0's Application Settings nb. the OAuth spec, fragments are not honoured |

