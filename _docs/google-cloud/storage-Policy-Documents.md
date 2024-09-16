---
title: Storage Policy Documents
category: Google Cloud
order: 1
---
Storage Policy Documents

Signed Policy Documents (specifies a group of CONTAINS) what can be UPLOADED to a bucket with a form POST. They allow greater control over Size, Content Type and other Upload characteristics compared to Signed URLs. Created in JSON, UTF-8 encoded.

```
{
    "expiration": "2023-08-15T11:11:11Z",
    "conditions": [
        [ "starts-with", "$key", "" ],      <- File name can begine with anything
        { "acl": "bucket-owner-read" },     <- The ACL that is applied to the file on upload
        { "bucket": "travel-maps" },
        { "success_action_redirect": "http://www.example.com/success.html" },   <- on success redirect location
        [ "eq", "$Content-Type", "image/jpeg" ],    <- only JPEGs can be uploaded
        [ "content-length-range", 0, 1000000 ]      <- Max size of 1 Megabyte
    ]
}
```


Creation process:
- create JSON encoded in UTF-8
- encode the Policy Document as a Base64 representation
- Sign your Policy Document using RSA with SHA-256 using the Secret Key provide in the Cloud Console then encode the message digest as a Base64 representation
- Add the Policy Document information to the HTML form including the Base64 Policy Document and Base64 Signature


Injection:
```
<form action="http://<bucket_name_here>.storage.googleapis.com" method="post" enctype="multipart/form-data">

    <input type="text" name="key" value="" />
    <input type="hidden" name="bucket" value="bucket_name_here" />
    <input type="hidden" name="Content-Type" value="image/jpeg" />
    <input type="hidden" name="GoogleAccessId" value="xxxxxx@developer.gserviceaccount.com" />
    <input type="hidden" name="acl" value="bucket-owner-read" />
    <input type="hidden" name="success_action_redirect" value="http://location/success.html" />
    <input type="hidden" name="policy" value="<base64_encoded_policy_goes_here...>" />
    <input type="hidden" name="signature" value="<base64_encoded_signature_here...>" />

    <input name="file" type="file" />
    <input type="submit" value="Upload" />
</form>


```