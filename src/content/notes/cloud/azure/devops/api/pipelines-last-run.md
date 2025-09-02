---
title: "Azure DevOps API: Get Pipelines last run"
summary: "A Jupyter Notebook to get the last run time of an Azure DevOps Pipeline"
tags: [ "Azure DevOps API", "AzDO Pipelines", "AzDO API" ]
---

## Notebook

Generates a report on all Azure DevOps Pipelines and their last run times.

```python
# Install dotenv
!python -m pip install python-dotenv
# Install requests
!python -m pip install requests
# Install pandas
!python -m pip install pandas
```

Create and populate a `.env` file with values for `USER` and `TOKEN` used to make calls to Azure DevOps API then read in those values to the `config` object.

```python
# Get .env file values
from dotenv import dotenv_values
config = dotenv_values(".env")  
```

Define an Azure DevOps API caller function.

```python
import requests

AZDO_ORGANISATION=""
AZDO_PROJECT=""
AZDO_API_VERSION="7.2-preview.1"

def call_azdo_api(path):
    """Call the Azure DevOps API with the given path and version parameters"""
    from requests.auth import HTTPBasicAuth
    AZDO_API_URL = f"https://dev.azure.com/{AZDO_ORGANISATION}/{AZDO_PROJECT}/_apis/{AZDO_API_VERSION}/{path}"
    print(f"Calling: {AZDO_API_URL}")
    try:
        response = requests.get(AZDO_API_URL, auth=HTTPBasicAuth(config["USER"], config["TOKEN"]))
        print(f"Status Code: {response.status_code}")
        print(f"Response OK: {response.ok}")
        response.raise_for_status()
        return response
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e})
        return None
```

Call the Azure DevOps API to get all Pipelines.

```python
import json
import pandas as pd

# Get all pipelines from the Azure DevOps API
all_pipelines_call = call_azdo_api("pipelines")
all_pipelines = json.loads(all_pipelines_call.text)
df_all_pipelines = pd.json_normalize(all_pipelines["value"])
print(f"Total Pipeline Count: {str(all_pipelines['count'])}")

# Print pipelines DataFrame
df_all_pipelines
```

Define a function to extract the last run time for a given Pipeline.

```python
def get_last_pipeline_run(pipeline_id):
    """Takes a Pipeline ID as input and returns formatted details of its last run time"""
    try:
        all_pipelines_runs_call = call_azdo_api(f"pipelines/{pipeline_id}/runs")
        all_pipeline_runs = json.loads(all_pipelines_runs_call.text)
        print(f"Total Pipeline runs: {all_pipeline_runs['count']}")
        last_pipeline_run_values = all_pipeline_runs["value"][0] if all_pipeline_runs["value"] else {}
        return {
            "last_run_pipeline_id": last_pipeline_run_values.get("pipeline", {}).get("id", ""),
            "last_run_total_runs": all_pipeline_runs.get("count", ""),
            "last_run_id": last_pipeline_run_values.get("id", ""),
            "last_run_name": last_pipeline_run_values.get("name", ""),
            "last_run_started_date": last_pipeline_run_values.get("createdDate", ""),
            "last_run_finished_date": last_pipeline_run_values.get("finishedDate", ""),
            "last_run_finished_state": last_pipeline_run_values.get("state", ""),
            "last_run_finished_result": last_pipeline_run_values.get("result", ""),
            "last_run_url": last_pipeline_run_values.get("url", "")
        }
    except Exception as e:
        print(f"Get last pipeline run failed for {pipeline_id} with: {e}")
        return None
```

CAll the Get Last Pipeline function for each Pipeline.

```python

# Build an array of all pipelines and their last run times
all_pipelines_with_last_runs = []
iteration = 0
for pipeline in all_pipelines["value"]:
    pipeline_details = {
        "pipeline_name": pipeline["name"],
        "pipeline_folder": pipeline["folder"],
        "pipeline_id": pipeline["id"],
        "pipeline_revision": pipeline["revision"]
    }
    pipeline_last_run = get_last_pipeline_run(pipeline["id"])
    pipeline_details.update(pipeline_last_run)
    all_pipelines_with_last_runs.append(pipeline_details)
    iteration += 1

# Create and print a Dataframe containing all pipelines and their last run times
df_all_pipelines_with_last_runs = pd.DataFrame(all_pipelines_with_last_run)
df_all_pipelines_with_last_runs

```

Write out results to a CSV file.

```python
from datetime import datetime

# Write out the DataFrame to CSV File
TIMESTAMP = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
csv_file_name = f"Results_{TIMESTAMP}.csv"
df_all_pipelines_with_last_runs.to_csv(csv_file_name, sep=",", encoding="utf-8", index=False, header=True)

# Print out count total
print(f"Wrote {len(all_pipelines_with_last_runs)}) Pipelines to file {csv_file_name}")
```