---
title: User Namespace Remapping
category: Docker
order: 1
---
User Namespace Remapping


The 'userns-remap'


If you enable User Namespaces on the Daemon, ALL CONTAINERS are started with User Namespaces enabled by default. 


Edit 
```
/etc/docker/daemon.json
```
The following entry enables 'userns-remap', and assuming the UID and GID of 'testuser' are '1001' or a combination of below:

```
testuser
testuser:testuser
1001
1001:1001
testuser:1001
1001:testuser
```
then the 'daemon.json' will look like:
```
{
    "userns-remap": "testuser"
}
```

#### Volumes
If volumes are mounted from the Host, file ownership must be pre-arranged for example the need to be able to read or write to the volume.

#### Limitations
In some situations, such as Privilege Containers, you may need to disable User Namespaces for a specific container. So, you must use the '--userns=host' flag when using the '--privileged' flag with 'docker run'.

#### Testing
One notable restriction is the inability to use the 'mknod' command.  Permission is denied for device creation within the container when run by the 'root' user.