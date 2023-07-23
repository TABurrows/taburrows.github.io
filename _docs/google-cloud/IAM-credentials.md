



For AUTHENTICATION, a CREDENTIAL is a DIGITAL OBJECT that PROVIDES PROOF of IDENTITY.

A CREDENTIAL is often exchanged by an application - or the library behind the application - for a TOKEN, which determines which resources the application is authorized to access.

A TOKEN is not a CREDENTIAL, but are instead a DIGITAL OBJECT that proves that the CALLER/TOKEN-HOLDER provided PROPER CREDENTIALS, but at GCP they are not considered credentials themselves.

## Types of Credential

- Passords
- PINs
- Biometric Data
- API Keys ( created in GCP Cloud Console, these however do not IDENTIFY a PRINCIPAL - they are used for billing and quota purposes)
- OAuth Client IDs ( created in GCP Cloud Console, are used to IDENTIFY an APPLICATION to Google. This is necessary when you want to access resources owned by your end users, also called three-legged OAuth ( 3LO ) )



## APPLICATION DEFAULT CREDENTIALS

Created for LOCAL ENVIRONMENT use at a WELL-KNOWN LOCATION with the command 'gcloud auth application-default login'

Once created ADC credentials are searched for in the following locations:
- GOOGLE_APPLICATION_CREDENTIALS environment variable
- User credentials set up by using the Google Cloud CLI
- The attached Service Account, returned by the Metadata Server



### GOOGLE_APPLICATION_CREDENTIALS environment variable

Is:
- a Credential Configuration for WORKLOAD IDENTITY FEDERATION
    WORKLOAD IDENTITY FEDERATION enables you to use an External IdP to access Google Cloud Resources.
Or:
- a Service Account Key
    These are a security risk and are not recommended, Unlike other credential file types, compromised Service Account Keys can be used by a bad actor without any additional information.