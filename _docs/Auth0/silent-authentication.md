---
title: Silent Authentication
category: Auth0
order: 1
---


The OIDC protocol supports a parameter `prompt=none` on the Authentication Request that allows applications to indicate that the Authorization Server must not display any user interaction such as Authentication, Consent or MFA.

Auth0 will either return the Requested Response back to the Application, or return an Error if the user is not already authenticated or if some type of consent or prompt is required before proceeding.


You can use the `Authorization Code Flow with PKCE` in conjunction with `Silent Authentication` to RENEW sessions in SPAs.


### Initiate Silent Authentication Requests

Example POST to `/authorize` endpoint:

```
GET https://{yourDomain}/authorize
    ?response_type=id_token token&
    client_id=...&
    redirect_uri=...&
    state=...&
    scope=openid...&
    nonce=...&
    audience=...&
    response_mode=...&
    prompt=none
```

The presence of `prompt=none` causes Auth0 to immediately send a result to the specified `redirect_uri` (callback) using the specified `response_mode` with one of two possible values `success` or `error`

Possible errors include the user was not logged in via SSO or their SSO session has expired.

In OIDC Spec, the following `ERROR_CODE` error codes are defined:
- `login_required` - the user was not logged in at Auth0 so Silent Authentication is not possible. This error can occur based on the way the tenant-level Log In Session Management settings are configured.  Specifically, it can occure after the time period set in the 'Require Log In After' setting. ( see Configure Session Lifetime Settings )
- `consent_required` - the user was logged in at Auth0, but needs to give consent to Authorize the Application
- `interaction_required` - the user was logged in at Auth0 and has authorized the application, but needs to be redirected elsewhere before Authentication can be completed. For example, when using a `Redirect Rule` 
If any of these errors are returned, the specs required that the User is returned to Auth0 Login pages with the `prompt=none` parameter removed to complete the Authentication steps again in a non-Silent manner.


You can renew expired Tokens if no ERROR_CODE is returned.


You can poll Auth0 periodically with a call to `checkSession()` to see if a session does not exist, if it doesn't then you can log the user out of the application. The same polling method could be used to implement Silent Authentication for a Single Sign-On scenario.

The poll Interval between checks to checkSession() should be AT LEAST 15 MINUTES between calls. This avoids any issues in the future with rate limiting of this call.



In some scenarios, you may want to avoid prompting the user for Multi-factor Authentication (MFA) each time they log in from the same browser. To do this, SET UP a RULE so that MFA occurs ONLY ONCE per session. This is useful when performing silent authentication `prompt=none` to renew short-lived Access Tokens in a SPA during the duration of a user's session without having to rely on setting `allowRememberBrowser` to `true`.

An example Rule:
```
exports.onExecutePostLogin = async (event, api) => {
  const authMethods = event.authentication?.methods || []

  const completedMfa = !!authMethods.find((method) => method.name === 'mfa')

  if (!completedMfa) {
    api.multifactor.enable('any', { allowRememberBrowser: true })
  }
};
```