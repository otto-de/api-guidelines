import { Oas3Rule } from "@redocly/openapi-core/lib/visitors";

/**
 * @see https://api.otto.de/portal/guidelines/r000021
 */
export const UseBearerAuthentication: Oas3Rule = () => {
  return {
    SecurityScheme(scheme, { report, location }) {
      if (scheme.in !== "header") {
        report({
          message: "'in' is not set to 'header'. See https://api.otto.de/portal/guidelines/r000021",
          location: location.child("in"),
        });
      }

      if (scheme.scheme !== "Bearer") {
        report({
          message:
            "scheme is not set to 'Bearer'. See https://api.otto.de/portal/guidelines/r000021",
          location: location.child("scheme"),
        });
      }
    },
  };
};
