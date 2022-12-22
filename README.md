# ottoapi_guidelines

This repository contains the source documentation of the OTTO API guidelines and acts as a `module` for the [OTTO API Portal](https://github.com/otto-ec/ottoapi_portal). The API guidelines aim for establishing a uniform API standard, which serves as a set of rules for the creation of new APIs.
The [API Manifesto](/manifesto.md) helps to establish this standard and comprises values that we have agreed upon in advance.

URL: <https://api.develop.otto.de/portal/guidelines>

## Requirements

This project requires at least Node.js version 16, or higher. We recommend using version 18.
If you need write permissions to this repository, you can add your team via PR to this file: [.github/gitty.yml#/configs/settings/default/teams](.github/gitty.yml#/configs/settings/default/teams).

### Get started

1. Create a `GITHUB_TOKEN` [in your GitHub developer settings](https://github.com/settings/tokens).
2. Assign the scope `read:packages` to the token and enable `SSO` for it.
3. Export the token: `export GITHUB_TOKEN=<Your Personal GitHub Accesss Token with SSO and packages:read>`
4. Ensure that Node.js and npm work properly: `node -v && npm -v`

### Setup the repository

1. Clone this repository: `git clone git@github.com:otto-ec/ottoapi_guidelines.git`
2. Install the dependencies: `npm ci`

## Contributing

The directory `./content` contains the Markdown files for the API Portal's guidelines section.
Our [Technical Writing Style Guide](https://github.com/otto-ec/ottoapi_portal/wiki) helps to write clear and consistent content and explains which custom content elements you can use in your Markdown files.

Run the development service:

```bash
npm run serve
```

Navigate to [http://localhost:3000](http://localhost:3000) to see the rendered output.

Happy coding!

## Release & deployment

Each commit of type `feat` or `fix` triggers a new npm package release and generates a new changelog entry.
[ottoapi_portal](https://github.com/otto-ec/ottoapi_portal) will be notified and automatically consumes the new version.

Actions are provided by the [ottoapi_cli](https://github.com/otto-ec/ottoapi_cli)
