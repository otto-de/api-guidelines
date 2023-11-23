import type { Oas3Rule } from "@redocly/openapi-core/lib/visitors.d.js";

/**
 * @see https://api.otto.de/portal/guidelines/r000051
 */
export const SecureEndpointsWithOAuth20: Oas3Rule = () => {
  return {
    SecurityScheme({ type }, { report, location }) {
      if (type !== "oauth2") {
        report({
          message: "Type is not OAuth 2.0. See https://api.otto.de/portal/guidelines/r000051",
          location: location.child("type"),
          suggest: ["type: oauth2"],
        });
      }
    },
  };
};
