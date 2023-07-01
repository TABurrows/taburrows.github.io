---
title: IAM - Custom Roles
category: Google Cloud
order: 1
---
IAM - Custom Roles

You don't directly grant Users Permissions, instead you grant them Roles which bundle one or more Permissions. This allows for the Mapping of Job Functions within the company to groups and roles.

Predefined Roles - Maintained by Google, updated automatically
Custom Roles - User Defined

Permissions always have the form:
<service>.<resource>.<verb>

eg. compute.instances.list, compute.instances.stop

Permissions usually but not always correspond 1:1 with REST methods:
eg. the caller of topic.publish() needs the pubsub.topics.publish permission

Custom Roles can only be used to Grant Permissions in Policies for the SAME Project or Organization that owns the Roles or Resources under them.  You cannot Grant Custom Roles from one Project or Organization on a Resource owned by a different Project or Org.


To create a Custom Role, a Caller must have the 'iam.roles.create' permission

Users who are not owners, including Organization Administrators must be assigned with the 'Organization Role Administrator' Role ( roles/iam.organizationRoleAdmin ) or the 'IAM Role Administrator' ( roles/iam.roleAdmin )

The 'IAM Security Reviewer' Role ( roles/iam.securityReviewer ) enables the ability to view Custom Roles but NOT to Administer them.

By Default, only Project Owners can create new Roles.

'Project Owners' can control access to this feature by Granting 'IAM Role Administrator' Role to Other Principals on the same Project.

For Orgs, only 'Organization Administrators' can grant the 'Organization Role Administrator' Role.

Before you Create a Custom Role, you might want to know:
- What Permissions can be applied to a Resource
- What Roles are grantable on a Resource
- What a Role's Metadata contains

You can get all Permissions that can be applied to a Resource, and the Resource below that in the Hierarchy, using the 'gcloud', the Cloud Console or the IAM API.

You can get All Permissions that are applyable on an Organization and on Projects in that Organization.

For a Project:
```
gcloud iam list-testable-permissions //cloudresourcemanager.googleapis.com/projects/$DEVSHELL_PROJECT_ID
```
This outputs something like:
```
name: appengine.applications.create
stage: GA
---
name: appengine.applications.get
stage: GA
...
name: appengine.instances.list
stage: GA
---
customRolesSupportLevel: TESTING
name: appengine.memcache.addKey
stage: BETA
---
customRolesSupportLevel: TESTING
name: appengine.memcache.flush
stage: BETA
---
```

Role Metadata for both Predefined Roles and Custom Roles includes the 'Role ID' and 'Permissions' contained in the Role.  The Metadata can be viewed in the Cloud Console, 'gcloud' or the IAM API:
```
gcloud iam roles describe roles/viewer

gcloud iam roles describe roles/editor
```
This outputs something like for 'roles/viewer':
```
description: Read access to all custom roles in the projects.
etag: AA==
includedPermissions:
- iam.roles.get
- iam.roles.list
- resourcemanager.projects.get
- resourcemanager.projects.getIamPolicy
...
...
name: roles/iam.roleViewer
stage: GA
title: Viewer
```


To return a list of All Roles that CAN be applied to a given resource:
```
gcloud iam list-grantable-roles //cloudresourcemanager.googleapis.com/projects/$DEVSHELL_PROJOECT_ID
```

To create a Custom Role, a caller must possess 'iam.roles.create' permission. Principals who are not 'Project Owners' or 'Org Owners' must be assigned either the 'Organization Role Administrator' Role or the 'IAM Role Administrator' Role. Either provide a YAML file or use CLI flags eg. for Org Level: ' --organization ', for Project Level: ' --project '

Example YAML template:
```
title: [ROLE_TITLE]
description: [ROLE_DESCRIPTION]
stage: [LAUNCH_STAGE]
includedPermissions:
- [PERMISSION_1]
- [PERMISSION_2]
```
Example YAML:
```
title: "Role Editor"
description: "Edit access for App Versions"
stage: "ALPHA"
includedPermissions:
- appengine.versions.create
- appengine.versions.delete
```

