---
title: Security - Identity Aware Proxy
category: Google Cloud
order: 1
---
Security - Identity Aware Proxy

IAP is an enterprise security model that enables every employee to work from untrusted networks without the use of a VPN.

IAP provides a central authentication and authorization layer for your applications over HTTPs.

IAP replaces end-user VPN tunnels or the need to apply an authentication and authorization layer in front of a web application hosted on Google Cloud.

At Google, IAP is used to control access to internal applications without the need to use end-user VPNs.

How it works:
A reverse proxy sits in front of every data request.
Whenever you attempt to log into an application, your request is forward to IAP which requires the user to log in.
Once logged in, the Proxy will determine if the user is allowed to access that Application.
If Authorization is obtained for the user, they are then forwarded to the requested application page.
[ nb. the proxy needs to have near zero latency to provide "invisible" security ]

IAP lets you manage access to App Engine instances, Compute Engine instances and GKE Clusters with a Central Authentication and Authorization layer for your applications over HTTPS.

IAP provides context-aware access for SSH and RDP which allows you to control access to VMs based on a User's Identity and Context (including device security status, location, etc.)

IAP also supports web-apps that even run outside Google Cloud.

IAP provides a much simpler administration process and with reduced operational overhead than more traditional VPN Solutions.


Practical Steps:
- Set up OAuth Consent
- Set up OAuth Access Credentials
- Set up IAP Access for the deployed Application
- Use IAP to restrict access to the Application


Enable the IAP API:
Identity-Aware Proxy
The Identity-Aware Proxy(Cloud IAP) controls access to your cloud applications and VMs running on Google Cloud Platform(GCP). 


Consent Screen:
Choose how you want to configure and register your app, including your target users. You can only associate one app with your project.

User Type:
- Internal
Only available to users within your organization. You will not need to submit your app for verification. 
- External
Available to any test user with a Google Account. Your app will start in testing mode and will only be available to users you add to the list of test users. Once your app is ready to push to production, you may need to verify your app.


Scopes express the permissions you request users to authorize for your app and allow your project to access specific types of private user data from their Google Account


Add Principal:
Type in email address of user
Assign Roles -> Cloud IAP   -> IAP-secured Web App User
                            -> IAP Settings Admin
                            -> IAP Policy Admin

Test IAP with: 
```
curl -kvi https://130.211.9.220
```

Look for the following headers:
< x-goog-iap-generated-response: true
x-goog-iap-generated-response: true

Follow the HTTP/2 302 redirect to see the Auth Login






In use, IAP can:
- Display a consent screen
- Pass on User Identity information to the protected App
- Use Cryptographic verification to prevent spoofing of user identity information

IAP is a GCP Service that intercepts web requests sent to your application, authenticates the user making the request using the Google Identity Service and only lets the request through if they come from a User you Authorize. In addition, it can modify the request headers to include information about the Authenticated User.

