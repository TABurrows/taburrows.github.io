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
