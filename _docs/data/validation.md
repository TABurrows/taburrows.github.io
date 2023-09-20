---
title: Data Validation
category: Data
order: 1
---
Data Validation

Validate early, validate often

Data validation is the process of ensuring data has undergone data cleansing to confirm they have data quality: both correct and useful.

Routines, such as "validation rules", "validation constraints" or "check routines" are used to check data for correctness.

Data validation is intended to provide well-defined guarantees for fitness and CONSISTENCY OF DATA in an application or automated system.
- declarative data integrity
- procedure-based business rules

- Data type validation
- Range an constraint validation
- Code and cross-reference validation
- Structured validation
- Consistency Validation


### Data-type check
### Simple range and constraint check
### Code and cross-reference check
### Structured check
### Consistency check


eg. 10-digit pre-2007
- size
- format
- check digit

### Validation Types
- Allowed Character checks
- Batch totals
- Cardinality chekc
- Check digits
- Consistency checks
- Cross-system consistency checks
- Data type checks
- File existence checks
- Format check
- Presence check
- Range check
- Spelling and grammar check
- Uniqueness check
- Table look-up check

### Post-Validation actions
- Enforcement action
- Advisory action
- Verification action
- Log of Validation

Failures or omissions in Data Validation can lead to DATA CORRUPTION or a SECURITY VULNERABILITY. Data validation checks that DATA ARE:
- Fit for purpose
- Valid
- Sensible
- Reasonable
- Secure
Before they are processed



### Rules for Consistency
Ensure the integrity of the data - a set of rules that helps in upholding the standards by ensuring data is stored and maintained in a certain way.

Data Type
Code Check
Range
Consistent Expressions
Format
No Null Values
Standards for Formatting


### How to Perfrom Data Validation
Data validation is used by processes like ETL where data is moved from a data source to a target warehouse. Validation certifies the ACCURACY OF THE END RESULT. To perform validation:
1. Determine a sample of data. Especially when the data is large in size, it is easier to validate a part of the data than its entirety. The volume of the sample needs to be in accordance with the size of the data set and an acceptable error rate must be defined before the process is initiated.
2. Dataset needs to be validated to confirm it contains ALL the required data
3. The source data's value, structure, format etc must match the destination schema.  The data is checked for redundant, incomplete, inconsisten or incorrect values as well

Data validation can be carried out with:
- Scripting
- Enterprise Tools
- Open-source Tools