/*
this is copied from
https://github.com/Redocly/redocly-cli/blob/main/packages/core/src/rules/oas3/operation-4xx-problem-details-rfc9457.ts

and modified to ignore anyOf, allOf, oneOf

Open Issue: https://github.com/Redocly/redocly-cli/issues/932

 */

import type { Oas3Rule, UserContext } from "@redocly/openapi-core";

// Inlined from @redocly/openapi-core/lib/rules/utils.js (not exposed in v2 package exports)
function validateDefinedAndNonEmpty(fieldName: string, value: unknown, ctx: UserContext): void {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return;
  }
  const obj = value as Record<string, unknown>;
  if (obj[fieldName] === undefined) {
    ctx.report({
      message: `${ctx.type.name} object should contain \`${fieldName}\` field.`,
      location: ctx.location.child([fieldName]).key(),
    });
  } else if (!obj[fieldName]) {
    ctx.report({
      message: `${ctx.type.name} object \`${fieldName}\` must be non-empty string.`,
      location: ctx.location.child([fieldName]).key(),
    });
  }
}

/**
 * Validation according rfc9457 - https://datatracker.ietf.org/doc/html/rfc9457
 */
export const Operation4xxProblemDetailsRfc9457: Oas3Rule = () => {
  return {
    Response: {
      skip(_response, key: string | number) {
        return !/4[Xx0-9]{2}/.test(`${key}`);
      },
      enter(response, { report, location }) {
        if (!response.content || !response.content["application/problem+json"])
          report({
            message: "Response `4xx` must have content-type `application/problem+json`.",
            location: location.key(),
          });
      },
      MediaType: {
        skip(_response, key) {
          return key !== "application/problem+json";
        },
        enter(media, ctx) {
          validateDefinedAndNonEmpty("schema", media, ctx);
        },
        Schema: {
          skip({ allOf, oneOf, anyOf, not }) {
            return Boolean(anyOf || allOf || oneOf || not);
          },
          SchemaProperties(schema, ctx) {
            validateDefinedAndNonEmpty("type", schema, ctx);
            validateDefinedAndNonEmpty("title", schema, ctx);
          },
        },
      },
    },
  };
};
