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
| `Consistency and Maintenance` | Your Auth0 Auth Server owns all the login pages = easier management + more consistent and secure pages.  You could also use a single login page among your apps, a process that creates an impression that users are logging into a centralized system rather than an individual app. | If you have more than one app, you must implement more than one login page.  You will also have to maintain and manage these pages.  Besides the extra effort it can also introduce inconsistencies which results in bad UX. Furthermore, with Embedded Login you would have to manage the dangers of Cross-Origin Attack Vectors. |

















## Security Risks

`Universal Login`


