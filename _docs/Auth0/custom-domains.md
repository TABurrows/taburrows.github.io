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