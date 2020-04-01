# Target format for API guidelines

As we are currently working on a new standard for our OTTO API, we should consider where and how to provide the resulting guidelines. 
The focus should be on making the guidelines easily accessible and digestible for our target group as well as on ensuring that the format is well accepted by the users.

In order to achieve this, we need to evaluate the possible options in terms of medium, format, layout, structure, or navigation.
Furthermore, we should keep in mind which option is scalable in terms of integrating the guidelines into a developer portal.

## Confluence

**PROS**

* Confluence is a classic documentation tool and already in use at OTTO
* Open system that every employee can access and contribute to content development (collaborative editing)
* Easy to use
* Content can be structured to our needs
* Allows for proper navigation via the page tree

**CONS**

* Custom layout is restricted to what Confluence provides by default
* Cannot be published as HTML (only intranet, word, pdf)
* Current FT4 guidelines are published in Confluence, but don't seem to be well received
* Cannot be made publicly available
* Not scalable

## GitHub repository

**PROS**

* Easy setup
* Documentation in Markdown format
* Can be made publicly available (with github.io extension)
* Content can be structured to our needs
* Allows for proper navigation
* Scalable, i.e. can be referenced/linked on a developer portal

**CONS**

* As stand-alone solution no custom layout
* A separate repo for guidelines would mean more effort when creating a dev portal (bringing several repos together)

## GitHub Pages

(i) GitHub Pages is available in public repositories with GitHub Free, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server.

**PROS**

* Easy setup (extension of GitHub repository)
* Documentation in Markdown format
* Can be made publicly available (with github.io extension)
* Content can be structured to our needs
* Allows for proper navigation
* Scalable, i.e. can be referenced/linked on a developer portal

**CONS**

* As stand-alone solution no custom layout only themes, no custom layout

## GitBooks

(i) similar to GitHub pages but more powerful

**CONS**

* Pricing


## api.otto.de

**PROS**

* Already in use
* Guidelines can be secured or made publicly available
* Content can be structured to our needs
* Allows for proper navigation
* Documentation in Markdown format
* Custom layout
* Scalable, i.e. api.otto.de can be expanded to a developer portal which then automatically includes the guidelines

**CONS**

🤷🏻‍♀️

## Examples of API Guidelines

- [Zalando](https://github.com/zalando/restful-api-guidelines) via GitHub pages
- [Google](https://cloud.google.com/apis/design) via Google Cloud platform
- [Microsoft](https://github.com/microsoft/api-guidelines) via GitHub repository
- [PayPal](https://github.com/paypal/api-standards) via GitHub repository
- [adidas](https://adidas.gitbook.io/api-guidelines/) via GitBook