---
title: Passwordless Connections
category: Auth0
order: 1
---



Passwordless Connections allow users to LOG IN *without* the need to remember a password.

Instead, Users enter their Mobile Phone nUmber or Email Address and receive a OTP or link, which they can then use to log in.

When a User authenticates through a Passwordless Connection, their profile is created on the connection using Auth0 as the IdP. NOTE. since you can't force users to use the *same* mobile phone number or email address every time they authenticate, you can end up with multiple user profiles in the Auth0 Datastore (in this case, you can use the facility to associate multiple user profiles by 'Linking Accounts')


### Passwordless Connection vs Password Login



