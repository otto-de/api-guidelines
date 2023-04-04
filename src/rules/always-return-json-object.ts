import { Oas3Rule } from "@redocly/openapi-core/lib/visitors";
import { isRef, Oas3Schema } from "@redocly/openapi-core";
import { Location } from "@redocly/openapi-core/lib/ref-utils";
import { ResolveFn } from "@redocly/openapi-core/lib/walk";
import { isJsonContentType } from "./utils/isJsonContentType";

const findNonObjectLocations = (
  schema: Oas3Schema,
  location: Location,
  resolve: ResolveFn
): Location[] => {
  const { type, allOf, anyOf, oneOf } = schema;
  if (type && type === "object") {
    return [];
  }

  if (isRef(schema)) {
    const { location: loc, node, error } = resolve(schema, location.source.absoluteRef);
    if (error) {
      return [];
    }
    return findNonObjectLocations(node, loc, resolve);
  }

  if (allOf) {
    const loc = location.child("allOf");
    return allOf.some(
      (s, index) => findNonObjectLocations(s, loc.child(index), resolve).length === 0
    )
      ? []
      : [loc];
  }

  if (anyOf || oneOf) {
    const loc = location.child(anyOf ? "anyOf" : "oneOf");
    return (anyOf ?? oneOf)
      .map((s, index) => findNonObjectLocations(s, loc.child(index), resolve))
      .flat();
  }

  return [type ? location.child("type") : location];
};

/**
 * @see https://api.otto.de/portal/guidelines/r004030
 */
export const AlwaysReturnJsonObject: Oas3Rule = () => {
  return {
    Response: {
      MediaType: {
        skip(_, key) {
          return !isJsonContentType(`${key}`);
        },

        Schema(schema, { location, resolve, report }) {
          const locations = findNonObjectLocations(schema, location, resolve);
          locations.forEach((loc) => {
            report({
              message:
                "Top-level type must be an object. See https://api.otto.de/portal/guidelines/r004030",
              location: loc,
            });
          });
        },
      },
    },
  };
};
