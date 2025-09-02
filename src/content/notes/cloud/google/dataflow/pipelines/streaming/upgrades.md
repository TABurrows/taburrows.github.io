---
title: "Google Cloud: Upgrade a Dataflow Streaming Pipeline"
summary: "An overview of how to upgrade a Dataflow Streaming Pipeline"
tags: [ "Google Cloud", "Dataflow", "Upgrade", "Streaming" ]
---

Some scenarios when you might need to upgrade include using a newer version of the Apache Beam SDK or replace pipeline code.

Establish if your application can tolerate interrupted processing

Establish if any schema changes are necessary in downstream data sinks

## Approaches

- Perform in-flight updates
- Launch a replacement job
- Run parallel pipelines

## Best practices

- Upgrade the Apache Beam SDK version separately from any pipeline code changes
- Test your pipeline after each change before making additional updates
- Regularly upgrad the Apache Beam SDK version that your pipeline uses

## In-Flight Updates

You can update some ongoing streaming pipelines *without* stopping the job in these circumstances:
- The job must use __Streaming Engine__
- The job must be in the __running__ state
- You are only changing the __number of workers__ that the job uses


## Replace Existing Jobs

If the update job *is compatible* with the existing job, you can update the pipeline using the __update__ option.

During replament of an existing job, a new job runs your updated pipeline code. Dataflow retains the job name but runs the replacement job with an update __Job ID__. This process might cause downtime while the existing job stops, the compatibility check runs and the new job starts.

If the compatibility check passes, your prior job is stopped. Your replacement job then launches on the Dataflow service while retaining the same job name. If the compatibility check fails, your prior job continues running on the Dataflow service and your replacement job returns an error.

note: Dataflow performs a compatibility check to ensure that the updated pipeline code can be safely deployed - if the compatibility check fails: you can not perform an in-place job update

The replacement job preserves the following items:
    - __Intermediate state data__ from the prior job - in-memory cahces are __not__ saved
    - Buffered data records or __metadata currently "in-flight"__ from the prior job. eg. some records in your pipeline might be buffered while waiting for a window to resolve
    - __in-flight job option updates__ that you applied to the prior job

### Intermediate State Data

Intermediate State data from the prior jbo is preserved in the replacement of existing jobs. (not including in-memory caches - if you want these saved, refactor your pipeline to convert cahces to __state data__ or to __side inputs__  )

### Windowing and Triggers

Changing __windowing__ or __triggers__ for the `PCollection` elements in your replacement pipeline requires caution.  Changing these strategies deosn't affect data that is already buffered or otherwise in-flight.

It is recommended only to attempt small changes to windowing - such as the duration of __fixed-__ or __sliding-time__ windows, making major changes to windows or triggers, such as changing the windowing algorithm, can leave pipelines in unpredictable states.


### Schema Fields

The following changes are supported when updating a pipeline:

- Adding one or more new fields to a schema
- Making a required (non-nullable) field type optional (nullable)

Removing fields, changing field names, or changing field types isnt' permitted during update 

### Pass Out-of-Band Data

You can pass out-of-band into an existing ParDo operation by:
- serialize information as fields in your `DoFn` subclass
- Any variables referenced by the methods in an anonymous `DoFn` are automatically serialized
- Compute data inside `DoFn.startBundle()`
- Pass in data using `ParDo.withSideInputs`






