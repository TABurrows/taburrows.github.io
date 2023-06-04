---
title: Networks - VPC Shared
category: Google Cloud
order: 1
---
Networks - Shared Virtual Private Clouds 

Centralized - Not inter-org - only works ACROSS Projects


Host Project  + Service Project(s)


Follow these steps for provisioning Shared VPC in Google Cloud:
- An Organization Admin nominates a Shared VPC Admin.
- A Shared VPC Admin enables shared VPC for the host project.  
- A Shared VPC Admin delegates access to some or all subnets of a shared VPC network by granting the Network User role. 
- A Network User creates resources in their Service Project.