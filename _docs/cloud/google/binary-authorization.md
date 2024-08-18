



Binary Authorization is used to enforce secure container image deployment

When an image is built by Cloud Build, an "attestor" verifies that it was from a trusted repository, built by a specific pipeline, passed tests, and was scanned for vulnerabilities.

Artifact Registry includes a vulnerability scanner that scans containers and results can be used to apply attestations allowing or blocking deployment.