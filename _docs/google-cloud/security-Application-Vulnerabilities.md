---
title: Security - Application Vulnerabilities
category: Google Cloud
order: 1
---
Security - Application Vulnerabilities

Developers are frequently given a requirements document that defines desired features and functional requirements for the application.

The code is written and tested many times against these features but the security of an application is often undefined and remains untested. Deadline pressures also promote the release of vulnerable code.  Hence attackers attack applications more often than networks and infrastructure. Often security is not part of the design process in application development and application security becomes a reactive process.

Some of the most common application vulnerabilities are categorized as "Injection Flaws":
- SQL
- LDAP
- HTML
- XSS ( JS is injected into an application to be subsequently executed in a victim's browser )

Authentication, Access Control and Session Management are "Application Logic" functions that are often implemented insecurely.

When insufficient control over Authentication and Access is exercised, this vulnerability allows attackers to compromise passwords, keys or session tokens, or to exploit other implementation flaws to assume other user's identities.

Applications and Web Applications also do not properly protect sensitive user data.  Attackers may steal or modify weakly-protected data to facilitate credit card fraud, identity theft, or other data and identity crimes.

Sensitive data risks being compromised any time it is transferred without extra protection.  Secure data transfer requires encryption at rest and in transit and special precautions when exchanged with a browser.

Security misconfiguration is commonly a result a insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages. Not only must all operating systems, frameworks, libraries and applications be securely configured, but they must also be patched and upgraded in a timely fashion in order to keep them secure.

* Applications using components with known vulnerabilities my undermine application defenses and enable various attacks and impacts. *

Components such as libraries frameworks and other software modules generally run with the same privileges as the main application itself.  As a result, when a vulnerable component is exploited an attach may facilitate serious data loss or even a server takeover.

