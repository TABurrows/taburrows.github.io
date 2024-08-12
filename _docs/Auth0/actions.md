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