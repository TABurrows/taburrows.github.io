---
title: Client Credentials Flow
category: Auth0
order: 1
---

OAuth 2.0 RFC 6749 section 4.4

Involves an application exchanging its application credentials, such as `Client ID` and  `Client Secret` for an `AccessToken`

![OAuth2.0 - Client Credentials Grant](/images/AUTH0/CLIENT-CREDS-FLOW.png)

1. Application sends Application's Credentials to the Auth0 Authorization Server

2. Auth0 Authorization Server validates Application's Credentials

3. Auth0 Authorization Server responds with an Access Token

4. Application can use the Access Token to call an API on behalf or itself (see Validating JWTs)

5. API responds with requested data

Used for:
- Backend
- M2M Apps

You can also implement the Client Credentials Flow with the Auth0 Authentication API:
Register the API with Auth0:
    - Add appropriate API permissions
Register the M2M Application with Auth0:
    - when registering the App in Auth0 select `Machine to Machine Applications` as the type
    - choose the previously registered API
    - Authorize the M2M Application to call your API


Steps:
1. Request Tokens: from the authorized application, request an Access Token for your API
2. Call API: use the retrieved Access Token to call your API


Example Access Token POST Request:

cURL:
```
curl --request POST \
  --url 'https://{yourDomain}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials \
  --data client_id=YOUR_CLIENT_ID \
  --data client_secret=YOUR_CLIENT_SECRET \
  --data audience=YOUR_API_IDENTIFIER
```

Node.JS:
```
var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://{yourDomain}/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    audience: 'YOUR_API_IDENTIFIER'
  })
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```

Example Response:

```
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

Then to call the API:

cURL:
```
curl --request GET \
  --url https://myapi.com/api \
  --header 'authorization: Bearer ACCESS_TOKEN' \
  --header 'content-type: application/json'
```


Node.JS:
```
var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://myapi.com/api',
  headers: {'content-type': 'application/json', authorization: 'Bearer ACCESS_TOKEN'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
```




Parameters

| Parameter | Description |
| :--- | :--- |
| `grant_type` | Set this to `client_credentials` |
| `client_id` | Your application's Client ID - found in the Application's Settings Tab |
| `client_secret` | Your application's Client Secret - found in the Application's Settings Tab |
| `audience` | The `aud` audience for the token which is your API's DNS name - found in the `identifier` field on your API's settings tab |


nb. Once the API has received an Access Token it will need to VALIDATE THE ACCESS TOKEN before granting access to the requested resources


## Customizing Tokens

You can use `Actions` to Deny Access Tokens based on Custom Logic and/or add claims to Access Tokens.  Auth0 invokes Actions attached to the Client Credentials grant at runtime to execute your Custom Logic.

### Machine-to-Machine Flow

Synchronous in Auth0 Pipeline. The Flow run during an Access Token being issued via the Clients Credentials Flow.

#### Triggers

M2M / Client Credentials

The CREDENTIALS-EXCHANGE TRIGGER is a function executed before the access token is returned


References:
- Event Object: provides contextual information about the request
- API Object: provides methods for changing the behaviour of the flow


Use Cases:
A `Credentials-Exchange Action` can be used to deny an Access Toekn based on Custom Logic:
```
/**
 * @param {Event} event - Details about client credentials grant request.
 * @param {CredentialsExchangeAPI} api - Interface whose methods can be used to change the behavior of client credentials grant.
 */
exports.onExecuteCredentialsExchange = async (event, api) => {
  if (event.request.geoip.continentCode === "NA") {
    api.access.deny('invalid_request', "Access from North America is not allowed.");
  }
};
```



A `Credentials-Exchange Action` can be used to add CUSTOM CLAIMS to an ACCESS TOKEN:
```
/**
 * @param {Event} event - Details about client credentials grant request.
 * @param {CredentialsExchangeAPI} api - Interface whose methods can be used to change the behavior of client credentials grant.
 */
exports.onExecuteCredentialsExchange = async (event, api) => {
  api.accessToken.setCustomClaim("https://my-api.exampleco.com/request-ip", event.request.ip);  
};
```


