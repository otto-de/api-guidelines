import type { Oas3Rule } from "@redocly/openapi-core";

/**
 * @see https://api.otto.de/portal/guidelines/r100038
 */
export const UseCuriedLinkRelationTypes: Oas3Rule = () => {
  return {
    // TODO maybe tricky -> need to know iana types http://www.iana.org/assignments/link-relations/link-relations.xhtml
  };
};
