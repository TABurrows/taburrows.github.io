

Deploy an App:
```
gcloud app deploy
```

View an App:
```
gcloud app browse
```

Note: App Engine has its standard and flexible environments which are optimized for different application architectures. Currently, when enabling IAP for App Engine, if the Flex API is enabled, Google Cloud will look for a Flex Service Account. Your lab project comes with a multitude of APIs already enabled for the purpose of convenience. However, this creates a unique situation where the Flex API is enabled without a Service Account created.
So, to Disable the API:
```
gcloud services disable appengineflex.googleapis.com
```

