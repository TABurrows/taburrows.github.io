---
title: Web Security Scanner
category: Google Cloud
order: 1
---
Web Security Scanner

Used to identify vulnerabilities in you applications.

Web Security Scanner probes for common vulnerabilities in App Engine, Google Kubernetes Engine and Compute Engine applications. It can automatically scan and detect four common vulnerabilities including:
- XSS
- Flash Injection
- Mixed Content
- Outdated/insecure libraries

Free for Google Cloud users

Setup, run, schedule and manage scans with Scanner

OWASP Top Ten: a document that ranks and provides remediation guidance for the top 10 most critical web application security risks [ https://owasp.org/Top10/ ] [ https://owasp.org/www-project-top-ten/ ]

A scan will attempt to exercise or activate as many user inputs, controls, and event handlers as possible.

For the scan you can provide:
- Authentication
- user agent type
- maximum request rate (qps)

Scanner report appears in:
- Results section
- Security Command Center
- Cloud Logging

Scans can run on a schedule or manually

Large, complex applications can take hours to be completely scanned and as a result such scans may need to be run less frequently.

Best practices:
- run in a test environment (but as close to production as possible)
- run with test data
- block specific urls
- use a 'normal user' ie first-time user workflows eg. new user's first sign-on
- backup data before a scan