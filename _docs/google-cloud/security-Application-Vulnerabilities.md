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
