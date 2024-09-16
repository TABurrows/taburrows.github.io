---
title: Log-based Metrics
category: Google Cloud
order: 1
---
Log-based Metrics (LBM)

Log-based metrics derive metric data from the content of log entries:
- count the number of log entries that contain a particular message
- extract latency information recorded in log entries

They can be used in Cloud Monitoring charts and alerting policies.


## Sources

You can use both Cloud Logging to collect general usage information and you can define your own log-based metric to capture information specific to your application or business.

Log-based metrics can apply within a single Project or within a Log Bucket.

You can NOT create log-based metrics for other Google Cloud resources such as Cloud Billing accounts or organizations.


### Bucket-scoped Log-based Metrics

Are user-defined LBMs that evaluate log entries routed to a specifice Log Bucket.  With Bucket-Scoped LBMs, you can create LBMs that extract data from logs in the following cases:
- Logs that are routed from one project to a bucket in another project
- Logs that are routed into a bucket through an Aggregated Sink


Like Project-Scoped LBMs, Bucket-Scoped LBMs are defined with a Google Cloud Project, not at the FOLDER or ORG LEVELs.  If you want to track the folder or org from which a log entry was routed to the bucket, then you can define LABELs in the LBM to record that information.


Bucket-Scope LBMs are defined in the SAME PROJECT that contains the SOURCE BUCKET. By default, only the Project that defines a Bucket-Scope LBM can see the metric data for the LOG BUCKET.

However, if your project appears in the METRICS SCOPE of other projects, those projects can also see your metrics.

The Projects that route logs to the log bucket DO NOT need to be in the METRICS SCOPE of any Project.