import { Oas2Rule } from "@redocly/openapi-core/lib/visitors";

/**
 * @see https://api.otto.de/portal/guidelines/r000003
 */
export const UseOas3: Oas2Rule = () => {
  return {
    Root(_, { report, location }) {
      report({
        message: "openapi >= 3.0.0 should be used.",
        location: location.child("swagger").key(),
      });
    },
  };
};
