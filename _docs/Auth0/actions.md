---
title: Actions
category: Auth0
order: 1
---




You can add any dependency from the public mirrors (that doesn't require node-gyp native add-ons)
```
Add Dependency
Name:
@slack/webhook
Version:
latest
```


Action Custom Logic:
```
const { IncomingWebhook } = require('@slack/webhook');

exports.onExecutePostLogin = async (event, api) => {
    const url = event.secrets.SLACK_WEBHOOK_URL;
    const webhook = new IncomingWebhook(url);

    // Send the notification
    await webhook.send({ text: "Logging In..." });
};
```


Test the action by clicking the triangular 'play' button


Then deploy the action by selecting 'Deploy


Final step, attach the Action to a Flow.
`Auth0 Dashboard > Actions > Flows`
Choose from:
- Login
- Machine to Machine
- Pre User Registration
- Post User Registration
- Post Change Password
- Send Phone Message
Drag and drop Actions into the Flows

Observer Actions in Tenant Logs
`Auth0 Dashboard > Monitoring > Logs`
Select a `Successful Login` event and then choose from:
- Raw
- Context Data
- Action Details
to see the details of the event



## Triggers

References:
- Event Object: provides contextual information about the request
- API Object: provides methods for changing the behaviour of the flow




