import { Oas3Rule } from "@redocly/openapi-core/lib/visitors";

/**
 * @see https://api.otto.de/portal/guidelines/r004080
 */
export const UseStringEnum: Oas3Rule = () => {
  return {
    Schema(schema, { report, location }) {
      if (schema.enum && schema.type !== "string") {
        if (schema.enum.length === 1) {
          // assume enum as const
          return;
        }

        report({
          message:
            "Enumeration is not represented as string. See https://api.otto.de/portal/guidelines/r004080",
          location: location.child("type"),
        });
      }
    },
  };
};
