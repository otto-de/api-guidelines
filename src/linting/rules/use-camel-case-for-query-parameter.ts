import { Oas3Rule } from "@redocly/openapi-core/lib/visitors";
import { isCamelCase } from "./utils/isCamelCase";

/**
 * @see https://api.otto.de/portal/guidelines/r000022
 */
export const UseCamelCaseForQueryParameter: Oas3Rule = () => {
  return {
    Parameter(parameter, { location, report }) {
      if (parameter?.in === "query") {
        if (!isCamelCase(parameter.name)) {
          report({
            message: "Query parameter is not in camel case.",
            location: location.child("name"),
          });
        }
      }
    },
  };
};
