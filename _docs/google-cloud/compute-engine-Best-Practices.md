---
title: Compute Engine - Best Practices
category: Google Cloud
order: 1
---
Compute Engine - Best Practices


- ensure proper permissions are given to control access to resources. Projects form the base for creating, enabling and using all Google Cloud services including managing Resource Permissions. Utilize Projects and IAM Roles to control access.
- host GCE resources on the same VPC Network where they require network base communication. If the resources aren't related and don't require network communication among themselve, consider hosting them on different VPC Networks.
- use Cloud VPN and Cloud Interconnect to extend on-prem and 3rd party connections
- Use Cloud Audit Loggin to generate logs for API Operations performed in Google Compute engine. Audit logs help you determine: "who did what", "where", and "when". Specifically, Audit logs track how Compute Engine resources are modified and accessessed wihtin projects for Auditing Purposes.]
- By default Users in a project can create Persistent Disks or copy images using any of the Public Images and any images that your project members can access through IAM Roles. You may want to restrict your Project Members so that they can create boot disks only from images that contain approved software that meets your Policy or Security requirements. You can define an Org Policy that only allows GCE VMs to be created from approved images - Trusted Images Policy, to enforce which images can be used in your organization.
- Hardening a Custom OS image will help reduce the attack surface for the instance. Making hardened images available in your organization can help reduce your organization's overall risk profile. 
    However, if you create a custom image formulate a plan for how to maintain the image with security patches and other updates.  GCE doesn't automatically update the OS or the software on your deployed instances. You will nedd to patch or update your deployed Compute Engine instances when necessary. 
    However it is not recommended that you patch or update individual running instances, instead update/patch the Image and then use that to launch an instance and replace the original
- Each instance that need to call a Google API should run as a Service Account with the minimum permissions necessary for that instance to do its job. In practice, you should configure service accounts for your instances like this:
    Create a new Service Account rather than using the GCE Default Service Account
    Grant IAM roles to that Service Account for only the resources that it needs.
    Configure the Instance to run as that Service Account
- Subscribe to "gce-image-notifications" announcements to receive release notes and other updates regarding public Compute Engine images.

