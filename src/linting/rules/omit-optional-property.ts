import type { Oas3Rule } from "@redocly/openapi-core/lib/visitors.d.js";

/**
 * @see https://api.otto.de/portal/guidelines/r004021
 */
export const OmitOptionalProperty: Oas3Rule = () => {
  // TODO compare with https://api.otto.de/portal/guidelines/r004020
  // TODO respect PATCH operation
  return {};
};
