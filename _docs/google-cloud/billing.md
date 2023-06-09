---
title: Billing
category: Google Cloud
order: 1
---
Billing

Rename the default Billing Account to something more meaningful

```
Billing -> Account Management -> "RENAME BILLING ACCOUNT"
```

Set or confirm the "Billing Account Administrator" Principal

```
Billing -> Account Management -> "Billing Account Administrator"
```

Set up Budget Alerts
```
Billing -> Overview -> "Keep track of your spend" -> "SET UP A BUDGET ALERT"
```

Or, create a Budge
- Name
- Time Range
- Services: "All Services"
- Credit & Promotion Allocation
then Amount:
- Budget Type
- Target Amount
Finally Actions:
- Set alert threshold rules:
  - 50%, 90%, 100%
- Set alert methods
    - Email
  - Pub/Sub topic (not possible if Pub/Sub org has 'domain restricted sharing' Organization policy in place)
    - "Link monitoring email notification channels to this budget"

Ensure Billing Health Checks are green:
```
Billing -> Overview -> Billing Health checks -> View all health checks
```

Billing Health checks:
- Remove 'Billing Account Creator' role for domain
- Link a Project or close unused account
- Assign multiple billing account admins
- grant access to view billing reports



Billing -> Billing Export - then specify Project Name and Dataset name

Export to BigQuery:
- Standard usage cost
- Detailed usage cost
- Pricing
Using Labels you can query and optimize for network spend:
```
SELECT
  TO_JSON_STRING(labels) as labels,
  sum(cost) as cost
FROM `project.dataset.table`
GROUP BY labels;
```

With labels of 'location' and 'server' ( labels can be applied on creation and via the 'Info' panel ):
```
SELECT labels.value as server, SUM(cost) as cost
FROM `dataset.table`
LEFT JOIN UNNEST(labels) as labels
ON labels.key = "server
GROUP BY server
ORDER BY cost DESC
```

And:
```
SELECT labels.value as location, SUM(cost) as cost
FROM `dataset.table`
LEFT JOIN UNNEST(labels) as labels
ON lables.key = "location"
GROUP BY location
ORDER BY cost DESC
```

Using the built-in SKU Description column:
```
SELECT sku.description, SUM(cost)
FROM `dataset.table`
GROUP BY sku.description
ORDER BY SUM(cost) DESC
```

Selecting the built-in Service Description column:
```
SELECT service.description, SUM(cost)
FROM `dataset.table`
GROUP BY service.description
```

Export to file:

