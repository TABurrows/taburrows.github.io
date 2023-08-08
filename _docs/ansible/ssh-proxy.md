


To tunnel ssh connections to a private instance, first setup a host definition on your cnc instance:

```
Host *
    Port 22
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
    ServerAliveInterval 60
    ServerAliveCountMax 30

Host bastion
    HostName bastion.mydomain.com
    User bastion
    IdentityFile ~/.ssh/id_rsa
```


Then test the bastion ssh connectivity:

```
ssh bastion
```

Test ssh connectivity to the host behind the bastion:

```
ssh -o ProxyCommand="ssh -W %h:%p -q bastion" -i ~/.ssh/key user@10.0.0.1
```


To use in Ansible, add to the inventory:

```
# cat inventory.ini
[deployment]
server-a ansible_host=172.31.81.94 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/ansible.pem
[deployment:vars]
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand="ssh -W %h:%p -q bastion"'
```

Or apply on the cli:

```
- e "ansible_ssh_common_args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand=\"ssh -W %h:%p -q bastion\"'"
```

