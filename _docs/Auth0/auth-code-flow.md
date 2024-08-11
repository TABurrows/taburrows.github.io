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

2. Auth0's SDK redirects user to Auth0 Authorization Server `/authorize` endpoint (the `Authorization URL `)

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

Parameters

| Parameter | Description
| :--- | :--- |
| `response_type` | Denotes `code` or `token` (eg. access token) that Auth0 `/authorize` will return. For the AUTHORIZATION CODE GRANT FLOW the value should always be `code` |
| `client_id` | The Client ID value from Auth0's Application Settings |
| `redirect_uri` | The callback URI.  This must exist as an endpoint on the Regular Web App and it must be registered as a redirect URL in Auth0's Application Settings nb. the OAuth spec, fragments are not honoured |
| `scope` | A `scope` dictates which `claims` (or USER ATTRIBUTES) you want returned from the `/authorize` endpoint (each separated by a space). eg. to get an ID Token in the response from endpoint, you must specify *at least* the `openid` scope.  If you want to return the user's full profile, then specify the scope `openid profile`. (you can request any of the standard OIDC scopes such as `email` or CUSTOM CLAIMS conforming to a NAMESPACE FORMAT). nb. include the scope `offline_access` to get a REFRESH TOKEN in the response (the Application must be configured to return a REFRESH TOKEN as well via the Application Setting value of 'Allow Offline Access') |
| `state` | (RECOMMENDED) An OPAQUE ARBITARY ALPHANUMERIC STRING your app adds to the initial request that Auth0 includes when redirecting back to your application - helps mitigate CROSS-SITE REQUEST FORGERIES (CSRF) <https://auth0.com/docs/protocols/oauth2/mitigate-csrf-attacks> |
| `connection` | (OPTIONAL) ID of the organization to use when authenticating a user. When NOT provided, if your application is configured to `Display Organization Prompt` the user will be able to enter the Organization Name when Authenticating. So to send a user to Github for authentication, enable the Github social login within the Auth0 Application Settings at `Auth0 Dashboard > Authentication > Social` and get the CONNECTION NAME value from the `Settings` tab (which for Github is 'github').  Then add that name to request URL with `&connection=github&`.  The default connection value will always be Auth0 `auth0`.  In the response, the Subject claim `sub` will be prefixed with the `connection` name value eg `auth0|581xxx` or `github|439xxx` |
| `invitation` | (OPTIONAL) Ticket ID of the Organization Invitation.  When Inviting a Member to an Organization, your app should handle invitation accpetance by forwarding the `invitation` and `organization` key-value pairs when the user accepts the invitation. |
| `login_hint` | (OPTIONAL) Populates the Username/Email field for the login or signup page when redirecting to Auth0.  Suppuorted by the Universal Login Experience. |


Sample HTML:

```
<a href="https://{your_auth0_domain}/authorize?
    response_type=code&
    client_id={client_id}&
    redirect_url={https://{your_redirect_domain/callback_path}&
    scope=openid%20profile%20offline_access&
    state=abcdefgxyz9876">
        Log In
</a>
```

Sample `/authorize` Response:

The endpoint, on successful authentication, will return an `HTTP 302` response.  The `authorization code` is included at the end of the URL:

```
HTTP/1.1 302 Found
Location: {https://{your_redirect_doamin/callback_path}?code={authorization code}&state=abcdefgxyz9876
```


## Authorization Code for Token Exchange

Once the application has received an Authorization Code `code`, it will need to post the value to the TOKEN URL `https://{your_auth0_domain}/oauth/token`

Example post with cURL:

```
curl --request POST \
  --url 'https://{yourDomain}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=authorization_code \
  --data 'client_id={yourClientId}' \
  --data 'client_secret={yourClientSecret}' \
  --data 'code=yourAuthorizationCode}' \
  --data 'redirect_uri={https://yourApp/callback}'
```


Example post with Node.JS:

```
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://{yourDomain}/oauth/token"

	payload := strings.NewReader("grant_type=authorization_code&client_id={yourClientId}&client_secret=%7ByourClientSecret%7D&code=yourAuthorizationCode%7D&redirect_uri={https://yourApp/callback}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("content-type", "application/x-www-form-urlencoded")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```


Example post with Go:

```
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://{yourDomain}/oauth/token"

	payload := strings.NewReader("grant_type=authorization_code&client_id={yourClientId}&client_secret=%7ByourClientSecret%7D&code=yourAuthorizationCode%7D&redirect_uri={https://yourApp/callback}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("content-type", "application/x-www-form-urlencoded")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```


Parameters

| Parameter | Description |
| :--- | :--- |
| `grant_type` | Set this to `authorization_code` |
| `code` | This `authorization_code` retrieved in the previous step of this tutorial |
| `client_id` | Your application's Client ID, as per the Auth0 Application Settings value |
| `client_secret` | Your Application Client Secret, as per the Auth0 Application Settings value |
| `redirect_uri` | The valid callback URL as per the Auth0 Application Settings. The value here and the value in the settings must match EXACTLY for the process to complete successfully (nb. this value must be URL ENCODED) |



## Response

A successful Authorization Code for Token exchange will return an `HTTP 200` response with a payload containing `access_token`, `refresh_token`, `id_token` and `token_type` values:

```
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

Note:
- `access_token` values are used to call the `/userinfo` application endpoint or another API.  If you are writing your own API, the `access_token` must be verified within the API handling code before access should be granted.

- `refresh_token` tokens can be used to replace outdated `access_token` Access Tokens or `id_token` ID Tokens.  The `refresh_token` will only be present in the response if the request included the scope of `offline_access` and `Allow Offline Access` is enabled in the Auth0 Application Settings.
(nb. `refresh_token` tokens must stored securely as they essentially allow a user to remain Authenticated for as long as the `refresh_token` is valid)



