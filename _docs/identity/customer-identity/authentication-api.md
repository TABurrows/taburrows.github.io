---
title: Authenticating to an API
category: Auth0
order: 1
---
Authenticating to an API


Using `Authorization Code Flow` grants, you can authenticate with:

- Regular Web Apps - the easiest approach
- the Authentication API - if you prefer to build your own solution


There are 5 options for Authenticating with the Auth0 Authentication API:
- OAuth2 Access Token 
    eg. send a Token using the Bearer Authentication Scheme to `/userinfo`
- Client ID and Client Assertion (confidential applications) 
    eg. generate a Client Assertion containing a Signed JWT to authenticate. In the Body of the Request, include your `client_id`, a `client_assertion_type` parameter with the value `urn:ietf:params:oauth:client-assertion-type:jwt-bearer` along with a `client_assertion` parameter with your signed assertion ( see PRIVATE KEY JWT ) 
- Client ID and Client Secret (confidential applciations)
- Client ID (public applications)
- mTLS Authentication (confidential applications)


Set up:

You will need to:
- Register your Application with Auth0 - values from the Auth0 Application Settings Dashboard are used in the Sign-In request as per the Authorization Code Grant Flow
- Register your API with Auth0 - note the `audience` value (`aud`) will be the Unique Identifier of the API you created.  This is viisble on the SETTINGS Tab of the API within the Auth0 API Settings Dashboard


On the registered Auth0 Application Settings:
    - Select an `Applicaiton Type` of `Regular Web Apps`
    - Add an `Allowed Callback URL` eg. https://myapp/auth_callback
    - Ensure `Authorization Code` has been enabled in the available `Grant Types` 
    - To use `refresh_token` tokens, ensure the available `Grant Types` includes the `refresh token` option




Steps:

1. Authorize User by requesting an `Authorization Code` with a valid `Sign In` URL (note the `audience` value here is the target API's Auth0 Unique Identifier from within the Auth0 API Settings Dashboard):

Request as an HTML element:

```
<a href="https://{yourDomain}/authorize?
  response_type=code&
  client_id={yourClientId}&
  redirect_uri={https://yourApp/callback}&  
  scope=appointments%20contacts&
  audience=appointments:api&
  state=xyzABC123">
  Sign In
</a>
```

Response - handled by the application `redirect_uri`:

```
HTTP/1.1 302 Found
Location: {https://yourApp/callback}?code={authorizationCode}&state=xyzABC123
```


2. Request Bearer Tokens from the `/oauth/token` endpoint in exchange for the `Authorization Code` extracted from step 1's response:

Parameters

| Parameter | Description |
| :--- | :--- |
| `grant_type` | Set this to `authorization_code` |
| `code` | The value from the `authorization_code` key received in step1 |
| `client_id` | The Client ID value from Auth0's Application Settings Dashboard |
| `client_secret` | The Client Secret from Auth0's Application Settings Dashboard |
| `redirect_uri` | The Callback URL defined in Auth0's Application Settings Dashboard |


Request With cURL:

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


Request with Node.JS:

```
var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://{yourDomain}/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: '{yourClientId}',
    client_secret: '{yourClientSecret}',
    code: 'yourAuthorizationCode}',
    redirect_uri: '{https://yourApp/callback}'
  })
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```


Request with Go:

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




Example Response:

```
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```