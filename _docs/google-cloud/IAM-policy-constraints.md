---
title: IAM Policy Constraints
category: Google Cloud
order: 1
---
IAM Policy Constraints

Allows for the Central Management of ACCESS to GCP Resources (including VPC Networks)

IAM focuses on WHO CAN TAKE ACTION

ORG POLICY focuses on WHAT CAN BE DONE - admins can set restrictions on specific resources to determine how they can be configured

The Organization Policy Service gives you CENTRALIZEd and PROGRAMMATIC control over you Org's Cloud Resources

Org Policy Administrators configure constraints across the entire Resource Hierarchy

An ORG POLICY is a Configuration of restrictions, set on Orgs, Folders and Projects for cascading enforcement

An ORG POLICY is defined by choosing a CONSTRAINT (which is a particular type of Restriction) against either a GCP Service or a group GCP Services.  The CONSTRAINT is given the desired RESTRICTIONS. Descendants of the targeted Resource Hierarchy Node inherit the ORG POLICY. By Applying an ORG POLICY to the root Org Node you can drive ENFORCEMENT of RESTRICTIONS across the entire ORG.

