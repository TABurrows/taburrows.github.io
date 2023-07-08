---
title: Organisations
category: Google Cloud
order: 1
---
Organisations

An Organization resource is available for "Google Workspace" and "Cloud Identity" customers

Create:
- Use Cloud Setup guide
    - Enable Cloud Identity and create an organization
    - Provision users and groups
    - Assign administrative access
    - Set up billing
    - Configure hierarchy and assign access
    - Set up networking
    - Centralize logging
    - Enable monitoring
    - Enable security capabilities
        - organizational policies
    - Choose a support model (online|premium)


Cloud Identity Free
- Sign up
```
https://workspace.google.com/signup/gcpidentity/welcome#0
```
- Business Name
- Number of Employees eg 1, 2-9 ... 300+
- Contact Info
- Provide DNS domain name ( emails sent to example.com won't be affected until you set up email with this account )
- Provide 1st Admin User
An account is created at admin.google.com (nb. different resource to google cloud resources)
- Link/verify DNS
    - Add DNS records
        Type = TXT
        Hostname = @
        Value = google-site-verification=asdfg...1234
    - Then click "Protect Domain"
        (verification can take up to 5 minutes)
        Success = "Great Job! example.com is protected"
- Part 2 Setup: Create new users (optional)

[ nb. Email & MX records are not affected by this process ]






Cloud Identity Premium
If you're a Workspace customer:
- Sign in to Google Admin Console
```
https://admin.google.com
```
then
```
Billing -> Get more services -> Cloud Identity
```
And start free trial





Once setup on Cloud Identity, Migrate Projects and Billing Accounts and set Permissions:
Steps 1-2 as the regular non-admin Cloud user:
- Grant access to Billing Accounts
    - Grant the Org Admin account the Billing Account Administrator role
- Grant access to Projects
    - Grant the Org Admin account the Owner Access to all projects
    - Set Bulk Permissions (optional)
        - IAM -> All Projects (select), then add the Org Admin as Owner to all projects



    Manage user accounts and groups for employees
    Set up billing
    Create organizational structure and centrally control all of your organization’s projects and resources
    Set up logging and monitoring
    Configure security guardrails 







 Add your administrative users to groups

In this step, you add members to the admin groups you created earlier.
The group creator will always be added as a group member at creation time. We recommend that you have more than one member per group.
Instructions:

    Add members to your groups by clicking Add members in the table below.
    Repeat this for each group listed. 

You can also manage group members from the Groups page in the Cloud Console.

Groups:

gcp-organization-admins@thing.industries
gcp-billing-admins@thing.industries
gcp-network-admins@thing.industries
gcp-logging-admins@thing.industries
gcp-logging-viewers@thing.industries
gcp-monitoring-admins@thing.industries
gcp-security-admins@thing.industries
gcp-developers@thing.industries
gcp-devops@thing.industries
	









 Confirm access for foundational groups

In this task you'll set access at the organizational level. In Task 5: Hierarchy & access you'll set it at the folder and project level. The following roles are recommended and based on the principle of least privilege.

Note: This step won't remove existing access if your organization has already given access to others.
Review IAM policies at the organizational level

To accept the IAM policies in the following table, click Save and grant access below. You can also customize the policies for any of the groups.
Group (Principal)
	
IAM roles (DEFAULTS/RECOMMENDED):
	
gcp-organization-admins@thing.industries 	
- Organization Administrator
- Folder Admin
- Project Creator
- Billing Account User
- Organization Role Administrator
- Organization Policy Administrator
- Security Center Admin
- Support Account Administrator
	
gcp-billing-admins@thing.industries 	
- Billing Account Administrator
- Billing Account Creator
- Organization Viewer
	
gcp-network-admins@thing.industries 	
- Compute Network Admin
- Compute Shared VPC Admin
- Compute Security Admin
- Folder Viewer
	
gcp-logging-admins@thing.industries 	
- Logging Admin
	
gcp-monitoring-admins@thing.industries 	
- Monitoring Admin
	
gcp-security-admins@thing.industries 	
- Organization Policy Administrator
- Security Reviewer
- Organization Role Viewer
- Security Center Admin
- Folder IAM Admin
- Private Logs Viewer
- Logs Configuration Writer
- Kubernetes Engine Viewer
- Compute Viewer
	
gcp-devops@thing.industries 	
- Folder Viewer 








 What to expect in these next few steps
Setup according to our enterprise best practices

The next 3 steps take you through Resource Hierarchy, Access, Networking, and Centralized Logging setup according to Google Cloud’s enterprise best practices. You can also choose to customize further to meet your needs.
Processing requirements

Google Cloud will create the project, service account, and roles needed to download your configuration as Terraform or to deploy it directly from the console. The Cloud Storage API and Cloud Config Manager API will also be enabled. The roles created and assigned to the service account are:

    Project Billing Manager at the project level
    Cloud Storage Admin on the project
    Service Usage Administrator on the project
    Storage Administrator on the project 

Learn more
about the roles assigned to the service account. 










 The list below reflects a set of policies Google recommends for most enterprise customers. These do not incur additional cost for your organization, and you can always make changes later.

Applying this set of policies will help prevent other people at your organization from taking actions that are not in line with your desired security posture. Learn more about organization policies.

Note: These policies are set at the organizational level. Any folders or projects under the organization will inherit them automatically.
Select which organization policies to enforce









 Why we recommend it

For organizations with multiple teams, Shared VPC provides an effective tool to extend the architectural simplicity of a single VPC network
across multiple working groups. The simplest approach is to deploy a single Shared VPC host project with a single Shared VPC network and then attach service projects to host projects for each of your teams. In this configuration, network policy and control for all networking resources are centralized and easy to manage. It's recommended to use two Shared VPCs to segment non-production and production workloads. Within each Shared VPC, service project departments can configure and manage non-network resources, enabling a clear separation of responsibilities for different teams in the organization. Resources in the service projects can communicate with each other securely and efficiently across project boundaries using internal IP addresses. You can manage shared network resources such as subnets, routes, and firewalls from the central host project allowing you to enforce consistent network policies across projects. 




     Services running in a service project can use Shared VPC to communicate with resources running in the other service projects. It's common to have multiple service projects operated and administered by different departments or teams in your organization.
    A service project can only be associated with a single host project. A service project by default has access to all of the VPCs in the host project it is associated with. A network administrator can grant a service project access to only some subnets.
    Resource quotas 

are often applied at the project level (host project) and apply to all Shared VPCs in the same project. Consider the impact of this approach when multiple workloads are leveraging the same resources.
IAM roles apply at the project level (host project), as opposed to the network or subnet level. If permitted, network and security admins will have the ability to make changes to the network and network security configuration on the host project and all of the host project's Shared VPCs. Administration of IAM roles of compute, storage, and other workload-related resources is defined in the individual service projects.
By default, resources deployed in different Shared VPCs are unable to communicate with each other. Additional configuration is required to enable cross-VPC communication. Learn more
Eligible resources from service projects can use subnets in the Shared VPC network. Learn more 



















 Default options

Flow logs, Private access, and Cloud NAT use default options. You can change these by clicking on the individual table cells. 







