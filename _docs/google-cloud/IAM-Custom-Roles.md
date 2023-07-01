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
