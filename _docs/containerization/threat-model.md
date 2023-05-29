---
title: Threat Model
category: Containerization
order: 1
---
Threat Model


Attack Vectors:
- Physical machine
- Virtual Machine
- Insecure network Virtual Machine
- Compromised container image
- Badly configured container image
- secret exposure
- container escape
- Insecure network Container network
- badly configured host
- Host application - vulnerable code exploits
- Container application - vulnerable code exploits
- Orchestrator application - vulnerable code exploits

Example breaching security boundaries:
1. Application dependency vulnerability -> remote code execution
2. Container escape vulnerability -> access data outside the container
3. Root privilege escalation -> container running as root on the host
4. Execution environment traversal