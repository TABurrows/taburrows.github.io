


## Access Context Manager




ACCESS CONTEXT MANAGER lets you reduce the size of the privileged network and move to a model where endpoints do not carry ambient authority based on the network. Instead, you can grant access based on the CONTEXT of the request, such as Device Type, User Identity etc. while still checking for corporate network access when necessary.


An integral part of BeyondCorp, allows Org Admins to define fine-grained, attribute based ACCESS CONTROL for Projects and Resources in GCP.

Org Admins 1st define an ACCESS POLICY, which is an ORG-WIDE CONTAINER for ACCESS LEVLES and SERVICE PERIMETERS.

ACCESS LEVELS describe the REQUIREMENTS for REQUESTS to be HONOURED:
- Device type & Operating system
- IP Address
- User Identity


SERVICE PERIMETERS define SANDBOXES of RESOURCES which can freely exchange data within the Perimeter but are not allowed to export data beyond.

ACCESS CONTEXT MANAGER is not responsible for POLICY ENFORCEMENT. Its purpose is to describe the desired rules. Policy is configured and enforced across various points such as VPC SERVICE CONTROLS.

You can CONFIGURE and ENFORCE Access Context Manager POLICIES across the following BeyondCorp Ent. solution components:
- VPC Service Controls
- Identity Aware Proxy
- Context-Aware Access for Workspace
- Identity and Access Management (IAM) CONDITIONS


## Access Levels

ACCESS LEVELS are used for permitting access to resources based on CONTEXTUAL INFORMATION about the request. For example, while many resources are avialable to 'Medium_Trust', certain more sensitive resources require 'Higher_Trust' levels. You can specify multiple levels as part of an ACCESS POLICY.

These checks are applied IN ADDITION to STANDARD IAM POLICY.

ACCESS CONTEXT MANAGER provides 2 ways to define ACCESS LEVELS: BASIC & CUSTOM

A BASIC ACCESS LEVEL is a COLLECTION OF CONDITIONS that are used to TEST REQUESTS.

CONDITIONS are a GROUP OF ATTRIBUTES that you want to test, eg. device type, IP Address, User Identity ...

The ATTRIBUTES are COMBINED as EITHER an 'AND' OPERATION (all must be true) or a 'NOR' OPERATION (none must be true) to determine if the CONDITION is MET.

CUSTOM ACCESS LEVELS are created using a SUBSET of COMMON EXPRESSION LANGUAGE. In addtion to the REQUEST CONTEXT used for BASIC ACCESS LEVELS, you can also use CUSTOM ACCESS LEVELS to permit requests based on data from 3rd Party Services.


Relevant Permission: accesscontextmanager.policies.create

Role: Access Context Manager -> Access Context Manager Admin


ACCESS LEVEL attributes:
- IP Subnetworks
- Regions
- Access Level Dependency
- Principals
- Device Policy
    - devicePolicy: is a list of one or more device policy attributes:
        - Require Screen Lock
        - Storage Encryption
        - Require Admin Approval
        - Require Copr Owned Device
        - OS Policy