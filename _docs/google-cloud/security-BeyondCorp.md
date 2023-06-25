---
title: Security - BeyondCorp
category: Google Cloud
order: 1
---
Security - BeyondCorp

A Security Model created in 2011, Google's new approach to Access Management ( started as an internal Google initiative to enable every employee to work from untrusted networks without the use of a VPN).

BeyondCorp shifts Access Controls from the Network Perimeter to individual users and devices, thereby allowing employees to work more securely from any location. This transforms work into being truly edgeless.

As end users work outside of the office more often and from many different types of devices, enterprises have common security models they are looking to extend to all users, devices and applications. 

Common use cases:
- ensure employees are prevented from copying and pasting sensitive data into email or saving data into personal storage such as Google Drive
- only allow Enterprise-managed devices to access certain key systems
- provide Data Loss Prevention protections for corporate data
- Gate access based on a User's location
- protect application in hybrid deployments that use a mix of Google Cloud and other hyperscalers or on-prem resources 


The Baseline Solution components for BeyondCorp Enterprise include:
- Cloud Identity
- Endpoint Verification
- Google Frontend (capturing time, ip, session age and location)
- Access Context Manager
- IAP, IAM, Cloud Identity, VPC SC
in front of Apps and Data: Web Apps, VMs, SaaS Apps, Infrastructure, APIs

Three Key Enforcement Points:
- Cloud Identity - Securing Access to Google Cloud (Managing Security) - used to extend context-awareness for Google Workspace tools, enforce access controls for Gmail, Docs, Sheets and 3rd party solutions via SAML
- VPC Service Controls: allow the mitigation of Data Exfiltration risks, configure Private Communications between cloud resources and hybrid VPC Networks and enforce context-aware access controls