---
title: Workforce Identity Federation
category: Google Cloud
order: 1
---
Workforce Identity Federation


OIDC Flow Types
Supports Authorization Code Flow and Implicit Flow for OICC providers.


Attribute Mappings
The IdP provides ATTRIBUTES (referred to by some IdPs as CLAIMS) which contain information about your users 
    - you can map these attributes using COMMON EXPRESSION LANGUAGE (CEL)

There are REQUIRED and OPTIONAL ATTRIBUTES that Google Cloud provides

You can also define CUSTOM ATTRIBUTES (CUSTOM CLAIMS) in your IdP that can then be used by specific Google Cloud products eg. in IAM ALLOW POLICIES.

- Max size for ATTRIBUTE/CLAIMS MAPPINGS is 4KB


Attributes:

- 'google.subject' (REQUIRED) a Unique Identifier for the AUTHTENTICATING USER. it is often the 'subject assertion of the JWT' because Cloud Audit Logs record the contents of this field as THE PRINCIPAL.
    You can use this FIELD to configure IAM for AUTHORIZATION DECISIONS. (don't use a mutable JWT value because if you change the value in your IdP's USER DIRECTORY, the user loses access)
    - Max Length is 127 bytes

- 'google.groups' (OPTIONAL) the collection of groups that the authenticating user is a member of. You can configure a logic expression using a subset of CEL that produces an ARRAY OF STRINGS. You can also use this field to configure IAM for AUTHORIZATION DECISIONS. Limitations for 'google.groups' are:
    - recommended: limit the group name to 100 characters
    - if one user is associated with more than 100 groups, define a smaller set of groups, and only include those groups in assertions used to federate the user to Google Cloud
    - if you use this attribute to grant access in IAM, EVERY member in the mapped groups is granted access.  Therefore, we recommend that you ensure that ONLY authorized users in your organization can modify the membership of the mapped groups.

- 'google.display_name' (OPTIONAL) attribute that is used to SET THE NAME of the signed-in user in the GCP CONSOLE. This attribute cannot be used in IAM ALLOW POLICIES nor in the ATTRIBUTE CONDITION.

- 'google.profile_photo' (OPTIONAL) a URL of the user's thumbnail photo. Recommended 400x400 pixels. This attribute cannot be used in IAM ALLOW POLICIES nor in the ATTRIBUTE CONDITION.

- 'google.posix_username' (OPTIONAL) a unique POSIX-Compliant username string used for OS LOGIN with WORKFORCE IDENTITY FEDERATION (Preview). This attribute cannot be used in IAM ALLOW POLICIES nor in the ATTRIBUTE CONDITION.
    - Max length is 32 CHARACTERS

- 'attribute.<KEY>' (OPTIONAL) a CUSTOMER-DEFINED attribute that is present in a user's IdP token. You can use these CUSTOM ATTRIBUTES/CLAIMS to define your AUTHORIZATION STRATEGY in an IAM ALLOW POLICY.
    eg. You can choose to define an attribute such as the user's cost center: 'attribute.costcenter = "1234"'. This attribute could then be used in IAM CONDITIONS to grant access only to users in that COST CENTER.
    - Max of 50 CUSTOM CLAIMS/ATTRIBUTES mapping rules
    - Max size of each rule is 2048 CHARS
    Although there are no restrictions in place on the ATTRIBUTES you can map here, we strongly recommend that you choose attributes whose values are STABLE. eg. use 'attribute.role' instead of the less stable 'attribute.job_description'


You can TRANSFORM ATTRIBUTE/CLAIMS VALUES using the STANDARD CEL FUNCTIONS. 

