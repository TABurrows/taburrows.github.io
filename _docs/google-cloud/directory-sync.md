---
title: Google Cloud Directory Sync
category: Google Cloud
order: 1
---
Google Cloud Directory Sync (GCDS)

You can use Google Cloud Directory Sync (GCDS) to automatically synchronize users, groups, and contacts so that the data in your Google Account matches the data in your LDAP server, such as Microsoft Active Directory.

Synchronize the data in your Google Account with your Microsoft Active Directory or LDAP server. GCDS doesn't migrate any content (such as email messages, calendar events, or files) to your Google Account. You use GCDS to synchronize your Google users, groups, and shared contacts to match the information in your LDAP server.

- Runs as a utility in your server environment
- Syncs users, aliases, groups, and other data with your Google Account
- Configure rules for custom mapping
- Has default settings to make setup easier#
- Uses step-by-step user interface
- Uses rules and exclusions so you can omit data from a sync


Best Practices:
- Ensure you meet the system requirements, particularly the amount of free RAM required
- Make sure your setup is secure—Ensure that the machine where GCDS is installed is secure. The credentials stored in the XML configuration file are encrypted, but if an attacker gains access to the machine, they can obtain both the XML file and the encryption key.
- Update your LDAP data first and remember to simulate a sync
- Review and invite unmanaged users: Check if you have existing unmanaged users. If you do, invite them to transfer their account to your organization's managed Google Account before running the first sync. Doing so ensures that a sync won't create conflicting accounts for these users.

- User accounts: Suspend, don't delete: If user accounts aren't found in your LDAP directory, set GCDS to suspend, rather than delete, the accounts. Deleted accounts can't be retrieved after 20 days, but data is retained for suspended accounts. You can also transfer email and Google Drive content from a suspended account to another account.
- Sync user accounts on a different schedule
- Admin accounts: Don't suspend or delete—By default, GCDS won't suspend or delete Google administrator accounts that aren't found in your LDAP directory. Retain this setting to make sure that you don't lose any Google admin accounts. 


- Review delete limits
- Use exclusion rules to retain users or groups in your Google Account
- Exclude LDAP data by using focused search rules