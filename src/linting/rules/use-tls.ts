import type { Oas3Rule } from "@redocly/openapi-core/lib/visitors.d.js";

/**
 * @see https://api.otto.de/portal/guidelines/r000046
 */
export const UseTLS: Oas3Rule = () => {
  return {
    Server({ url }, { report, location }) {
      if (!url.startsWith("https://")) {
        report({
          message:
            "Server url is not secured with TLS. See https://api.otto.de/portal/guidelines/r000046",
          location: location.child("url"),
        });
      }
    },
  };
};
