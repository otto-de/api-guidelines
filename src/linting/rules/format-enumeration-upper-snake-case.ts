import type { Oas3Rule } from "@redocly/openapi-core/lib/visitors.d.js";
import { isUpperSnakeCase } from "./utils/isUpperSnakeCase.js";

/**
 * @see https://api.otto.de/portal/guidelines/r004090
 */
export const FormatEnumerationUpperSnakeCase: Oas3Rule = () => {
  return {
    Schema(schema, { report, location }) {
      if (!schema.enum || !Array.isArray(schema.enum)) return;

      if (schema.enum.length === 1) {
        // assume enum as const
        return;
      }

      schema.enum.forEach((value, index) => {
        if (!isUpperSnakeCase(`${value}`)) {
          report({
            message: `enum value "${value}" is not upper snake case. See https://api.otto.de/portal/guidelines/r004090`,
            location: location.child("enum").child(index),
          });
        }
      });
    },
  };
};
