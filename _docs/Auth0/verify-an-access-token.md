---
title: Verify an Access Token
category: Auth0
order: 1
---
Verify an Access Token


An ACCESS TOKEN is meant for an API and should be validated ONLY by the API for which it was intended.

An INVALID TOKEN must be rejected with a `401 Unauthorized` response.

[ nb. an IdP/3rd Party issued Access Token do not require validation - these are also usually opaque and can only be used to access APIs that belong to the IdP.  See Identity Provider Access Tokens ]


A Token is invalid if any of these checks fail:

1. Standard JWT Validation
    Because the Access Token is a JWT, you must follow the standard `Validate a JWT` validation steps.

2. Audience Claims Validation
    The Token `aud` Audience Claim (an array of strings) could contain BOTH an Audience corresponding to the Custom Target API and an Audience claim corresponding to the `/userinfo` endpoint.  At least one of the Audience values for the Token MUST MATCH the Unique Identifier for the Custom Target API (as expressed in the Auth0 API's Settings Dashboard under the `Identifier` field)

3. Permissions/Scopes Validation
    Verify that the Application has been Granted the Permissions required to access your Custom Target API. Check the `scope` Scope Claim (a space-separated list of strings) in the Decoded JWT's payload. There should be a match for the Custom Target API's Endpoint to which a Request has been made.