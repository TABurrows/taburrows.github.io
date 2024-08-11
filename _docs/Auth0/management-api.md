---
title: Auth0 Management API
category: Auth0
order: 1
---
Auth0 Management API


The Auth0 Management API is a collection of endpoints to complete administrative tasks programmatically and should be used by BACK-END SERVERS and TRUSTED PARTIES. (most things that can be done through the Auth0 Settings Dashboards can be done programmatically through the Auth0 Management API).

Not to be confused with the `Auth0 Authentication API`

example
```
curl -H "Authorization: Bearer eyJhb..." https://@@TENANT@@.auth0.com/api/v2/users
```
