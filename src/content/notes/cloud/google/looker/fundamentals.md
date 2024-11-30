---
title: "Google Cloud: Looker Fundamentals"
summary: "An overview of Google Cloud Looker"
tags: [ "Google Cloud", "Looker", "Fundamentals" ]
---


Google Cloud Looker is Google Cloud's business intelligence suite of software.

## Concepts

A Looker Project is a collection of files that describe the Object, Database Connections and User Interface elements that will be used to carry out SQL Queries.

These Git-versioned files (one project=one git repo) describe how your Database Tables relate to each other and how the UI should interpret them. If the files include LookML parameters these can define or change the options that are presented in the UI.

A Looker project can be access from the __Develop__ menu within Looker

A Project's set of files contains:

- a __Manifest__ file containing instructions for using external files or configuration settings such as localization


, __Models__ (__Explores__, __Joins__), __Views__ (__Dimensions__, __Measures__, __Field Sets__) and __Dashboards__ (__Visualizations__).




## Database Connectivity

### Options

Connection Scope - should the Connection be available to all an Org's projects or just one

SQL Dialect - it is important to choose the dialect that matches the source database

Host - is the hostname of the database connection or 'localhost' if an SSH tunnel is setup for the database connection

Authentication - choose the right option according to the supported method outlined in the documentation (db username and password, service account or oauth2+OIDC)

