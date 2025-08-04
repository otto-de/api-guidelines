# OTTO AsyncAPI example

The [asyncapi.yaml](asyncapi.yaml) contains an example AsyncAPI spec that has been created according to the [Event-Guidelines](https://api.otto.de/portal/guidelines/event-guidelines/concepts).

It contains useful comments and references to the applied guidelines.

## Render the AsyncAPI spec locally

To render the AsyncAPI spec locally, you'll can use the [asyncAPI CLI](https://github.com/asyncapi/cli).

### Preparation

Install AsyncAPI CLI. See <https://github.com/asyncapi/cli> for information.

### Generate and open the AsyncAPI spec

```shell
# Generate HTML page into html folder (do not commit!)
asyncapi generate fromTemplate asyncapi.yaml @asyncapi/html-template --force-write -o html
# Open html
open html/index.html
```

## Example of integration into Backstage

Have a look at the [catalog-info.yaml](/catalog-info.yaml) in the root of this repository for an example of the necessary metadata needed to integrate this AsyncAPI example into backstage.
