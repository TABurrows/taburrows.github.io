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
| `Feature Management` | You can turn on and off features such as MFA, across all your apps using the Dashboard. | Must be done for each application individually. |
| `User Experience` | Redirected to another subdomain to log in. | Not redirected to another subdomain to login |
| `Mobile Apps and Security` | According to the RFC for OAuth 2.0 best practice for Native Apps (https://www.rfc-editor.org/rfc/rfc8252.txt), only EXTERNAL USER AGENTS (ie the Browser) should be used by Native Applications for Authentication Flows. Using the Browser to make Native App Authorization requests results in a better security and it gives users the confidence that they are entering credentials in the right domain.  It also enables use of the User's Current Authentication state, making SSO possible. | Embedded user agents are deemed unsafe for Third Parties and should not be implemented.  With Native Login a Malicious App could try and phish users for Username/Password or Tokens.  Also, if your mobile apps use Native Login, then your users have to enter their credentials for each of your apps, hence SSO is not possible |


## Security Risks

Universal Login is more secure than Embedded Login.  Authentication takes place over the same domain, eliminating cross-origin requests.  CROSS-ORIGIN AUTHENTICATION IS INHERENTLY MORE DANGEROUS.  Collecting user credentials in an application served from one origin and then sending them to another origin can present certain security vulnerabilities. Phishing Attacks are more likely, as are BUCKET BRIGADE ATTACKS. Universal Login does not send information between Origins, thereby negating cross-origin concerns. See Preventing Common Cyber Security Attacks (https://auth0.com/docs/secure/security-guidance/prevent-threats)

















## Security Risks

`Universal Login`


