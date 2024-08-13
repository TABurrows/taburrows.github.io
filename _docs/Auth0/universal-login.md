---
title: Universal Login
category: Auth0
order: 1
---


In designing the Authentication Experience for your application, you have to choose whether the Login Flow will use `Universal Login` or `Embedded Login` approaches. 

With `Universal Login` users are sent to a central domain for Authentication no matter where they are within the app.  Google Cloud Workspaces uses the central domain `https://accounts.google.com` for log from within any of its many apps

With `Embedded Login` users interact with a Login Widget served from the same page.  No domain redirecting is performed to another domain etc.  In a `Web App` therefore, this is a `cross-origin request` (CORS).


## Pros and Cons


| Feature | Universal Login | Embedded Login |
| :--- | :--- | :--- |
| *Single Sign-On* | You can only have SSO with `Mobile Apps` if you use `Universal Login`. With `Web Apps` SSO is possible with an `Embedded Login` however it is more secure to use the central `Universal Login` service as cookies are always from the same origin. | With `Embedded Login` applications collect user credentials from one origin and then send them to another, which present certain security vulnerabilities as well as introduce the possibility of a phishing attack |
| 

















## Security Risks

`Universal Login`


