---
title: Custom Claims
category: Auth0
order: 1
---


It is strongly recommended to only use namespaced Custom Claims in the form of URIs, this prevents COLLISIONS with any reserved or existing claims from other resources.

To READ Custom Claims on Access and ID Tokens, you must use JWT JSON Web Tokens AND pass an `Audience (aud)` in an OIDC LOGIN FLOW.

Limitations:

- The Custom Claims Payload is set to a maximum of 100KB
- OPENID Standard Claims or Claims used internally by Auth0 cannot be customized or modified
- Access Tokens with an Auth0 API Audience, excluding the `/userinfo` endpoint, cannot have private, non-namespaced Custom Claims
- Only specified OIDC User Profile Claims can be added to Access Tokens

The following Claims are subject to Auth0s Restrictions:
`acr`
`act`
`active`
`amr`
`at_hash`
`ath`
`attest`
`aud`
`auth_time`
`authorization_details`
`azp`
`c_hash`
`client_id`
`cnf`
`cty`
`dest`
`entitlements`
`events`
`exp`
`groups`
`gty`
`htm`
`htu`
`iat`
`internalService`
`iss`
`jcard`
`jku`
`jti`
`jwe`
`jwk`
`kid`
`may_act`
`mky`
`nbf`
`nonce`
`object_id`
`org_id`
`org_name`
`orig`
`origid`
`permissions`
`roles`
`rph`
`s_hash`
`sid`
`sip_callid`
`sip_cseq_num`
`sip_date`
`sip_from_tag`
`sip_via_branch`
`sub`
`sub_jwk`
`toe`
`txn`
`typ`
`uuid`
`vot`
`vtm`
`x5t#S256`