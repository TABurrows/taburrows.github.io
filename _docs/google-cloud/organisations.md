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



