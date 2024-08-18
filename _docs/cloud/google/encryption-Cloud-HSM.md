---
title: Encryption - Cloud HSM
category: Google Cloud
order: 1
---
Encryption - Cloud HSM

Creates a HSM Cluster for the tenant.

Cloud HSM supports FIPS 140-2 level 3.

FIPS 140-2 is a US government computer security standard for cryptographic modules.

Level 3 includes tamper-evident physical security mechanisms and has a high probability of detecting and responding to attempts at physical access, use, or modification of the cryptographic module.

The physical security mechanisms may include the use of strong enclosures and tamper detection and response circuitry.


Cloud HSM supports Cavium version 1 and version 2 attestation formats.

An attestation statement shows that the key is HSM-protected. [ Attestation is a signed statement by both Google and the HSM that the contents of the key has certain properties ]

To get the Attestation: ellipsis -> Get Attestation -> Download

It is a token that is cryptographically signed directly by the physical hardware and can be verified by the user.

Key management is similar to Cloud KMS.

For keys created in Cloud HSM, an attestation statement can be generated. The attestation statement provides evidence that the key is HSM protected. It contains a token that is cryptographically signed directly by the physical hardware. This can be verified by the user; for example, by using a program or script to parse the contents.

To create: 'Create Key' and select region then change the encryption 'protection level' setting from 'software' to 'HSM'

