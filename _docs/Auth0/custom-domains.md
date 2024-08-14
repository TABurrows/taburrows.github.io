---
title: Custom Domains
category: Auth0
order: 1
---

*PAID FEATURE*

If you have a paid Auth0 Subscription, you can use your own domain name (CNAME or vanity URL) on authentication pages.  A Custom Domain let you UNIFY the login experience with your won brand and products.  Your users see a URL that displays your brand such as `login.YOUR_DOMAIN.com` instead of the default Auth0 URL `YOUR_DOMAIN.auth0.com`

They can be added at sign-up or after


Brand Benefits:
- trust
- brand loyalty
- no breaking of branding context

Architectural Benefits:
- more maintainable
- apps get only the access they need
- authn services scale easiliy

Security Benefits:
- some browsers by default make it difficult to perform cross-domain iFrame communication
- Phishing attacks must replicate your domain design (there probably is already a standard Auth0 design out in the wild)
- with a custom domain you can get Extended Validation for your Certs making phishing harder still


## How to Implement

Navigate to Auth0 Dashboard > Branding > Custom Domains
    - add Custom Domain, choose your certification type, and how its managed:
        - Auth0-managed cert
        - Self-managed cert

In DNS add a CNAME from YOUR_DOMAIN.auth0.com to login.YOUR_DOMAIN.com
- cookies may need to be deleted for existing sessions
- user with existing sessions will need to log in again


## Custom Domains and Authentication

The following Auth0 authentication features support the use of Custom Domains:

| Feature or Flow | Details |
| :--- | :--- |
| `Universal Login` | For a seamless and secure user experience |
| `MFA` | All factors |
| `Guardian` | Android SDK / Swift SDK / MFA Widget v1.3.3 / Guardian.js v1.3.0+ |
| `Emails` | Links included in the emails use your custom domain |
| `Connections` | Database, Social, Google Workspace, Azure AD, ADFS, AD/LDAP |
| `Lock` | v11 with COrs authentication |
| `Passwordless` | With Universal Login (the email link sent using the Custom Domain if the option is enabled in Dashboard > Tenant Settings > Custom Domains ) |
| `SAML` | Connections and  Applications |
| `WS-Federation` | Auth0 as identity provider using WS-Fed add-on |
| `OAuth 2.0 / OIDC Compliant Flows` | Using the `/authorize` and `/oauth/token` endpoints |



### Certificate Management

Auth0 Managed: 
    - Add a CNAME record on the Domain
    - Validate the record and generate the cert on Auth0 Servers
    - auto-renewed every 3 months

Self-Managed:
    - Auth0 negotiates SSL with the proxy, not directly with the end-user client
    - The proxy in turn negotiates SSL with the end-user.
        (you need to add a header: cname-api-key to validate requests)
    - You must be an Auth0 Enterprise subscriber to use this options
    
