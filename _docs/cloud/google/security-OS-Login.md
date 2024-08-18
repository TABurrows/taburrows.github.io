---
title: Security - OS Login
category: Google Cloud
order: 1
---
Security - OS Login

Recommended method to manage many-user access across multiple VM Instances or projects.

Is use to manage SSH access to your instances using IAM without having to create and manage individual SSH keys.

Maintains a consistent Linux user identity across VM Instances

simplifies SSH Access Management by linking your Linux User Account to your Google Identity.

Administrators can easily manage access to instances at either an instance or project level  by setting IAM permissions.

Provides:
- automatic linux account lifecycle management: you can directly tie a linux user account to a user's Google Identity so that the same Linux account information is used across all instances in the same project or organization
- Fine grained Authorization using IAM: Project nad Instance-level Admins can use IAM to grant SSH access to a user's Google Identity without granting a broader set of privileges eg. you can grant a user permission to log into the system, but not the ability to run commands such as sudo. Google checks these permissions to determine whether a user can log into a VM Instances.
- Automatic permission updates: with OS Login, permissions are update automatically when an administrator changes IAM Permissions. eg. if you remove IAM permissions from a Google Identity then access to VM Instances from a Google Identity, then access to VM Instances is revoked. Google checks permissions for every login attempt to prevent unwanted access.
- ability to import existing Linux accounts: administrators can choose to optionally synch Linux account information from AD and other LDAP providers that are set up on-premise. eg. you can ensure that users has the same UID (User ID) in both your Cloud and on-prem environments.  
- Supports 2-factor authentication: if you use OS Login to manage access to VM Instances, you can add an extra layer of security by using 2-step verification.  
