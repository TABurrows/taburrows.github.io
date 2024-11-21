---
title: "Apache Beam Fundamentals"
summary: "An overview of Apache Beam's constructs"
tags: [ "Dataflow", "Apache Beam", "Fundamentals" ]
----

Apache Beam is the open source project behind Google Cloud's Dataflow product.

Apache Beam - four main concepts:
- Beam transforms - called a `P Transform`
- P collections - the data is held on an immutable, distributed data instruction called a `P Collection`.
- Pipelines - a pipeline identifies the data to be processed and the actions to be taken on the data.
- Pipeline runners - analogous to container hosts, such as GKE. they carry out the actual work


The integral Pipeline can be run on a local computer, in a virtual machine, in a data center or in a service in the cloud such as Dataflow.

Any change that happens in a Dataflow Pipeline receives one `P Collection` as input and ccreates a new `P Collection` as output. No change is made to the incoming `P Collection`.  The actions are contained in an instruction called a `P Transform`. The data in a `P Collection` is passed along the GRAPH from one `P Transform` to another.




