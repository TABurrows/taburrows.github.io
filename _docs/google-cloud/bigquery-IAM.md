---
title: BigQuery - IAM
category: Google Cloud
order: 1
---
BigQuery - IAM

BigQuery IAM Roles and authorized views to demonstrate managing access to Datasets and tables:

BigQuery uses Identity and Access Management (IAM) to manage access to resources and permissions that are granted at the Dataset level.

BigQuery lets you assign Roles individually to certain types of resources within Datasets, like tables and views, without providing complete access to the Dataset's resources.

Table-level permissions determine the users, groups, and service accounts that can access a table or view.

It also supports access control at column-level security through policy tags and at row-level security through row-level access policies.

A few of the BigQuery IAM Roles:
BigQuery Admin - can do everything in BQ: create, read data , run jobs, set IAM policies etc
BigQuery Data Owner - Read/Write access to data, plus can grant access to other users and groups by setting IAM Policies
BigQuery Data Editor - Read/Write access to data
BigQuery Data Viewer - Read-only access to data
BigQuery Job User - can create and run jobs, but no access to data
BigQuery User - can run jobs, create datasets, list tables, save queries, but NO default access to data


Notice how the role names are mapped to job functions, such as BigQuery admin or BigQuery Data Viewer.

When using BigQuery, you can assign IAM Roles to individual users or groups.

It is always better to assign Roles to groups.

There is much less operational overhead managing groups than managing each user individually.

The Roles you assign provides the required access permission to the Datasets: for example; Viewer, Editor, or Owner.

By default the user who created the Dataset is the owner, but additional members can be given permissions including the owner role.

What if I want admins or super users to see all the data in a table, and others to only see a subset of the data?

#### Authorized Views

To do this, use authorized views.

Views provide row or column level permissions to Datasets.

To create authorized views, create a second Dataset with different permissions from the first.

Add a view to the second Dataset that selects the subset of data you want to expose from the first Dataset.

In the first Dataset, you must give the View Access to the underlying data.



nb. do row-level filtering using information about the logged-in user.

nb. use Authorized Views to provide audiences read-only access to subsets of tables.

nb. use the CURRENT_USER() function to limit access to specific rows within a table/view.

nb. use the SESSION_USER() function to limit access to specific rows within a table/view.