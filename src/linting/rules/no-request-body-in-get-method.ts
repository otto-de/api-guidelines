import type { Oas3Rule } from "@redocly/openapi-core/lib/visitors.d.js";

/**
 * @see https://api.otto.de/portal/guidelines/r000007
 */
export const NoRequestBodyInGetMethod: Oas3Rule = () => {
  return {
    Operation: {
      skip(_, key) {
        return key !== "get";
      },
      RequestBody(_, { report, parentLocations }) {
        report({
          message:
            "Get method must not have a request body. See https://api.otto.de/portal/guidelines/r000007",
          location: parentLocations.Operation,
          suggest: ["use query parameters"],
        });
      },
    },
  };
};
