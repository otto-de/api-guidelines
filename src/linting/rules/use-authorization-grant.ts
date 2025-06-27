import type { Oas3Rule } from "@redocly/openapi-core/lib/visitors.d.js";

/**
 * @see https://api.otto.de/portal/guidelines/r000052
 */
export const UseAuthorizationGrant: Oas3Rule = () => {
  const message = "Must use Authorization Grant. See https://api.otto.de/portal/guidelines/r000052";

  return {
    Root({ components }, { report, location }) {
      if (!components) {
        report({
          message,
          location,
        });
      }
    },

    SecurityScheme({ flows }, { report, location }) {
      if (!flows?.clientCredentials && !flows?.authorizationCode) {
        report({
          message,
          location,
        });
      }
    },
  };
};
