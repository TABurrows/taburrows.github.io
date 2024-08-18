---
title: Foundation
category: Google Cloud
order: 1
---
Foundation


Set up your foundation:
https://console.cloud.google.com/cloud-setup


1. CLOUD IDENTITY & ORGANIZATION


2. USERS & GROUPS:

 Google Cloud administrative groups
	
Group
	
Description
	
	
	gcp-organization-admins 	Organization administrators have access to administer all resources belonging to the organization 	
	
	gcp-billing-admins 	Billing administrators are responsible for setting up billing accounts and monitoring their usage 	
	
	gcp-network-admins 	Network administrators are responsible for creating networks, subnets, firewall rules, and network devices such as cloud routers, Cloud VPN instances, and load balancers 	
	
	gcp-logging-admins 	Logging administrators have access to all features of Logging 	
	
	gcp-logging-viewers 	Logging viewers have read-only access to a specific subset of logs ingested into Logging 	
	
	gcp-monitoring-admins 	Monitoring administrators have access to use and configure all features of Cloud Monitoring 	
	
	gcp-security-admins 	Security administrators are responsible for establishing and managing security policies for the entire organization, including access management and organization constraint policies 	
	
	gcp-developers 	Developers are responsible for designing, coding, and testing applications 	
	
	gcp-devops 	DevOps practitioners create or manage end-to-end pipelines that support continuous integration and delivery, monitoring, and system provisioning 	
	


3. ADMINISTRATIVE ACCESS

 Create administrative users in the Google Admin console

For the purpose of this onboarding checklist, we recommend that you initially add users who will participate in the checklist tasks, such as administrators (organization, network, billing, etc) and decision makers involved with your cloud setup practices. You can continue the rest of the checklist without adding all of your cloud users. At a later time, once you've set up your foundation using this checklist, we recommend adding all users. Follow these instructions

to learn about federating and provisioning users into Google Cloud.

Google Admin console is a central place for admins to manage user identities and accounts across Google services, such as Workspace, Google Cloud, Maps, etc.
Instructions:

    You will need to sign into the Google Admin console with the Super Administrator account that you created in task 1.
    Once you have added your admin users, return to this tab and click Continue to complete the users and groups setup. 



    https://admin.google.com/ac/users?authuser=0&hl=en_US


ADD MEMBERS

 Add your administrative users to groups

In this step, you add members to the admin groups you created earlier.
The group creator will always be added as a group member at creation time. We recommend that you have more than one member per group.
Instructions:

    Add members to your groups by clicking Add members in the table below.
    Repeat this for each group listed. 

You can also manage group members from the Groups page in the Cloud Console.
Group
	
Members
	
	
gcp-organization-admins@thing.industries	1 	
	
gcp-billing-admins@thing.industries	1 	
	
gcp-network-admins@thing.industries	1 	
	
gcp-logging-admins@thing.industries	1 	
	
gcp-logging-viewers@thing.industries	1 	
	
gcp-monitoring-admins@thing.industries	1 	
	
gcp-security-admins@thing.industries	1 	
	
gcp-developers@thing.industries	1 	
	
gcp-devops@thing.industries	1 	
	

