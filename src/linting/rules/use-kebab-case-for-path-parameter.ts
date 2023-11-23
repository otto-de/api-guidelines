import type { Oas3Rule } from "@redocly/openapi-core/lib/visitors.d.js";
import { isKebabCase } from "./utils/isKebabCase.js";

/**
 * @see NO RULE -> will follow
 */
export const UseKebabCaseForPathParameter: Oas3Rule = () => {
  // TODO add guideline rule
  return {
    Parameter(parameter, { location, report }) {
      if (parameter?.in === "path") {
        if (!isKebabCase(parameter.name)) {
          report({
            message: "Path parameter is not kebab case.",
            location: location.child("name"),
          });
        }
      }
    },
  };
};
