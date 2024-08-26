---
title: Password Reset Flow
category: Auth0
order: 1
---

The Password Reset Flow runs during the password reset process when a User completes the first challenge, typically a link to the User's Email, but before a new password is set.  You can use this flow to challenge a user an additional MFA factor or to redirect the user to an external site, such as a third-party verifier.

After verification, users can provide the new password for their account.

![OAuth2.0 - Password Reset Flow](/images/AUTH0/PASSWD-RESET-FLOW.png)

Actions in this flow are blocking (synchronous), which means they execute as part of a trigger's process and will prevent the rest of the Auth0 pipeline from running the Action is complete.

(nb. you must have `Universal Login` enabled - these actions cannot be triggered using `Classic Login`)

## Triggers

### PostChallenge

The `post-challenge` trigger is a function that executes are after a user completes the first password reset challenge, typically by an EMAIL MAGIC LINK.

You can create up to FOUR ACTIONS in your tenant that leverage the `post-challenge` trigger.




