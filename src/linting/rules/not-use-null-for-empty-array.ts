import type { Oas3Rule } from "@redocly/openapi-core/lib/visitors.d.js";
import type { Oas3_1Schema, Oas3Schema } from "@redocly/openapi-core";
import type { Location } from "@redocly/openapi-core/lib/ref-utils.d.js";
import type { Problem } from "@redocly/openapi-core/lib/walk.d.js";

const findArrayNullExamples = (
  { type, properties, items }: Oas3Schema | Oas3_1Schema,
  example: unknown,
  location: Location,
): Location[] => {
  if (example === null && type === "array") return [location];

  if (Array.isArray(example) && items) {
    return example
      .map((value, index) =>
        findArrayNullExamples(
          items as Oas3Schema | Oas3_1Schema,
          example[index],
          location.child(index),
        ),
      )
      .flat();
  }

  if (typeof example === "object" && properties) {
    return Object.entries(properties)
      .map(([key, value]) => findArrayNullExamples(value, example[key], location.child(key)))
      .flat();
  }

  return [];
};

function reportLocations(locations: Location[], report: (problem: Problem) => void) {
  locations.forEach((loc) => {
    report({
      message: "Example for type array is null. See https://api.otto.de/portal/guidelines/r004060",
      location: loc,
      suggest: ["change to []"],
    });
  });
}

/**
 * @see https://api.otto.de/portal/guidelines/r004060
 */
export const NotUseNullForEmptyArray: Oas3Rule = () => {
  // TODO handle anyOf/oneOf/allOf

  return {
    MediaType({ example, examples, schema }, { report, location }) {
      if (!schema) return;

      if (example) {
        const loc = location.child("example");
        const locations = findArrayNullExamples(schema, example, loc);
        reportLocations(locations, report);
      }

      if (examples) {
        const loc = location.child("examples");
        const locations = Object.entries(examples)
          .map(([key, value]) => findArrayNullExamples(schema, value, loc.child(key)))
          .flat();
        reportLocations(locations, report);
      }
    },

    Schema(schema, { report, location }) {
      const loc = location.child("example");
      const locations = findArrayNullExamples(schema, schema.example, loc);
      reportLocations(locations, report);
    },
  };
};
