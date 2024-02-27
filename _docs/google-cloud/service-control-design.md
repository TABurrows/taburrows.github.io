---
title: Service Control Design
category: Google Cloud
order: 1
---
# Google Cloud - Service Control Design


## VPC Service Controls deployment architectures

Tips:
- plan in advance
- keep it simple

A single large perimeter (COMMON UNIFIED PERIMETER) provides the most effective protection against data exfiltration compared to using multiple, segmented perimeters:
    - lower management overhead

Since services and network resources within a perimeter can communicate freely with the necessary IAM and network controls permissions, the teams responsible for perimeter management will primarily be concerned with North-South access (access from the Internet to Resources within the perimeter)

When using multiple smaller perimeters, orgs must devote more resources to managing East-West traffic in addition to North-South traffic from outside the organization.

Recommendation: layer the perimeter with additional security controls and best practices such as ensuring that resources within the VPC netowkr don't have Direct Internet Egress.

Service Perimeters aren't intended to replace or reduce the need for IAM controls. When you are defining access controls, the recommendation is to ensure that the principle of Least Privilege is followed and IAM Best Practices are applied.

## Multiple Perimeter Use Cases

For an organization that handles healthcare data you might have one perimeter around high-trust, non-obfuscated data and a separate perimeter around lower-tier, de-identified data to facilitate sharing with with external entities etc.

If your org complies with standards such as PCI DSS, you might want to have a separate perimeter around regulated data.

