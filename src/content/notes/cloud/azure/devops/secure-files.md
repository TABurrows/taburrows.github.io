---
title: "Azure DevOps API - Secure Files"
summary: "Reading Secure Files data from Azure DevOps API"
tags: [ "Azure", "DevOps", "API", "Secure Files" ]
---

## Setup Environment


```bash
# Create a virtual environment
!python -m venv secure-files-json
# To activate the environment on Windows
!./env/Scripts/activate
# To activate the environment on Mac/Linux
!./env/bin/activate

# Install python-dotenv to remove PAT from Repository 
!python -m pip install python-dotenv

# Install requestss library for making HTTP calls
!python -m pip install requests

# Install pandas for dataframes
!python -m pip install pandas

# Install flatten for JSON flattening
!python -m pip install flatten_json

```

## Configure Environment

```python
# configure the execution environment
from dotenv import dotenv_values
import json
import requests
import pandas as pd
from flatten_json import flatten

# Read in the .env file values
config = dotenv_values(".env")

# Create a variable to hold the Secure Files values
secure_files_values = None

# Call the Secure Files API endpoint
response = requets.get("https://dev.azure.com/<ORG>/<PROJECT>/_apis/distributedtask/securefiles?api-version=7.1-preview", auth=HTTPBasicAuth(config["TOKEN_USER"],CONFIG["PAT_TOKEN"]))
secure_files_data = json.loads(response.text)
secure_files_values = secure_files_data["value"]

# # To read from a file
# with open('data.json','r') as source_json:
#     source_data = json.load(source_json)
#     source_values = source_data['value']


# Normalize JSON Objects in the values array
for i in range(len(secure_files_values)):
    secure_files_values[i] = flatten(secure_files_values[i], "_")

# Print
print(secure_files_values)
```

Create a DataFrame from the srouce values

```python

# Create a DataFrame
secure_files_df = pd.DataFrame(secure_files_values)

# Print out  DataFrame
secure_files_df

```

To merge two datasets, use the merge method.

```python
# Open CSV file as another DataFrame
service_accounts_df = pd.read_csv("./service_accounts.json")

# Merge the two datasets
merged_data_df = pd.merge(service_accounts_df, secuer_files_df, how='inner', left_on='Key ID', right_on='properties_key_id')

# Print results
merged_data_df
```

The Data Wrangler extension in VS Code can be used to give a spreadsheet-like interface to the data.
