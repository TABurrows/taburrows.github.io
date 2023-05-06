---
title: Playbooks
category: Ansible
order: 1
---
Ansible

Playbook automation:

- Repeatable
- Consistent
- Reusable

They can also benefit from versioning and collaboration when hosted under Software Version Control systems.

Execute playbooks requesting ssh user and root passwords:

```
ansible-playbook -kK -i ...
```
