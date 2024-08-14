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

Embedded User Agents are UNSAFE for Third Parties, including the Auth0 Authorization Server itself.  If an Embedded Login is used, the App has access to both the Authorization Grant and the User's Authentication Credentials.  As a consequence, this data is left vulnerable to recording or malicious use.  Even if the app is trusted, allowing it to access the Authorization Grant as well as the user's Full Credentials is unnecessary.  This violates the Principle of Least Privilage and increases attack surfaces.

( https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html )



## Universal Login with Auth0

A Universal Login strategy, where Auth0 will show a login page if Authentication is required.  You can customize the Login Page using the Dashboard. you can use Auth0's Custom Domains (£) to persist the  across teh Login Page adn the App.  The redirect to the Login Page will be transparent to your Users becuse the domain will not change. ( https://auth0.com/docs/customize/custom-domains )

Whenever your app triggers an authentication request, the user will be redirected to the login page in order to authenticate.  THIS WILL CREATE A COOKIE.  In future Authentication Requests, Auth0 will check for this cookie, and if it is present the user will not be redirected to the login page.  They will see the page only when they need to actually log in. This is the easiest way to implement SSO.

Note that if the incoming Authentication Request uses an external IdP (for example Facebook) the login page will not be displayed. Instead, Auth0 will direct the user to the Identity Provider's Login Page.

You can deploy your CUSTOM LOGIN PAGE from an external repository, such as GitHub, Bitbucket, GitLab or MS Azure.

The recommendation is to use Universal Login when you use Auth0.  The first and foremost reason is security. Using Auth0 Universal Logi instead of embedding Login in your application provides seamless CSRF protection.  This helps prevent 3rd Party Impersonation or the Hijacking of Sessions.


## Embedded Login with Auth0

Embedded Logins in Web Apps with Auth0 use Cross-Origin Authentication (https://auth0.com/docs/authenticate/login/cross-origin-authentication) This uses 3rd Party Cookies to allow for secure Authentication Transactions across different Origins.  This DOES NOT APPLY to Native Applications since they use the standard OAuth 2.0 `/token` endpoint. (https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Third-party_cookies)

Auth0 does not recommend using Cross-Origin Authentication.  However if you must, only do so when authenticating against a Directory using a Username and Password. Social IdPs and Enterprise Federation use a different mechanism, redirecting via standardized protocols such as OIDC and SAML.  Additionally, cross-origin authentication is only applicable to embedded login on the web (using Lock or auth0.js). Native Applications using Embedded Login make use of the standard OAuth 2.0 Token Endpoint.

In addition, if you have not enabled Custom Domains, the end-user must have a browser that supports Third-Party Cookies.  Otherwise, in some Browsers, Cross-Origin Authentication will fail.  This limitation applies to both traditional Username/Password database connections as well as Passwordless (a form of authentication that does not rely on a password as the first form factor) database connections.













## Security Risks

`Universal Login`


