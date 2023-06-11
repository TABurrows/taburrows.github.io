---
title: Security - Shielded VMs
category: Google Cloud
order: 1
---
Security - Shielded VMs


Designed to mitigate some types of malware attack that can remain undetected on virtual machines for long periods of time. Shielded VM offers verifiable integrity of your Compute Engine VM Instances - offering confidence that instances have not been compromised by boot-level or kernel-level malware or rootkits, or that secrets are exposed and used by others.

Google-curated images include:
- CentOS8
- COS 101 LTS
- Debian 10
- RHEL 9
- Ubuntu 22.04 LTS
- Windows Server 2022
  ( more in Marketplace )


You can transform an existing VM into a Shielded VM that runs on Google Cloud: each time your VM starts up, secure boot makes certain that the software it is loading is Authentic and Unmodified by verifying that the firmware has been Digitally Signed with Google's Certificate Authority Service (CAS).  Shielded VM instances use Unified Extensible Firmware Interface (UEFI) firmware, which securely manages the certificates that contain the keys used by the software manufacturers to sign the System Firmware, the System Boot Loader and any Binaries Loaded.

UEFI firmware verifies the Digital Signature of each boot component in turn against its secure store of approved keys, and if that component isn't properly signed (or isnt' signed at all) it is not allowed to run.

