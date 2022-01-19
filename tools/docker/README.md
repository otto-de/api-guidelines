# Docker Container

To run the docs server in a Docker container, run

```bash
export GITHUB_TOKEN=<github-pat>"; ./tools/docker/run_docs_server
```

This will build the container and then run it with `guidelines` folder mounted so that changes will be rendered in
real-time and no rebuild is required. The container is named `ottoapi-docs-server`.

**NOTE** For installing the NPM dependencies, you will need a valid github access token. The github access token must be
granted 'read:packages' scope and must have access to otto-ec.

## Configuration

You can set the following environment variables before running the `run_docs_server` script:

- `DOCS_SERVER_PORT` the port the docs server will be accessible (defaults to 3000)

## Docker compose setup for Windows users

- Open Powershell
- Navigate to the base folder of this project
- Set a local env variable for GITHUB_TOKEN
  - `$env:GITHUB_TOKEN = '<github-pat>'`
- Start the service
  - `docker-compose -f tools/docker/docker-compose.yml up`
- If you want to rebuild the image, run
  - `docker-compose -f tools/docker/docker-compose.yml build`
- Open a browser and navigate to `http://localhost:3000/` to see the guidelines
- Troubleshoot
  - `npm ERR! code E401` -> Your github token is either invalid or your environment variable GITHUB_TOKEN is not set
