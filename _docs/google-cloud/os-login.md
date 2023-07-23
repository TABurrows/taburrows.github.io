


OS Login

Use OS Login to manage SSH access to your instances using IAM without having to create and manage individual SSH keys. OS Login maintains a consistent Linux user identity across VM instances and is the recommended way to manage many users across multiple VMs or projects.

- manage SSH access to your instances using IAM
- maintains consistent Linux user identity across VM instances
- recommended way to manage many users across multiple instances or projects
- simplifies SSH access management

You enable OS Login via the server-defined metadata.

Metadata
You can set Custom metadata for an instance or project outside of the server-defined metadata.  This is useful for passing in arbitary values to your project or instance that can be queried by your code on the instance.

Key:                Value:
enable-oslogin      TRUE