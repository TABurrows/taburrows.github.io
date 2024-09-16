---
title: Common Expression Language
category: Google Cloud
order: 1
---
Common Expression Language

### Examples

For a given type
```
package google.account;

import "google/protobuf/struct.proto";

message Account {
  oneof {
    string user_id = 1;
    int64 gaia_id = 2;
  }
  string display_name = 3;
  string phone_number = 4;
  repeated string emails = 5;
  google.protobuf.Struct properties = 6;
  ...
}
```


The following evaluate to true
```
has(account.user_id) || has(account.gaia_id)    // true if either one is set
size(account.emails) > 0                        // true if emails is non-empty
matches(account.phone_number, "[0-9-]+")        // true if number matches regexp

```
