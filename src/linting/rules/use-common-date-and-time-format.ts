import type { Oas3Rule } from "@redocly/openapi-core/lib/visitors.d.js";
import type { Oas3_1Schema, Oas3Schema } from "@redocly/openapi-core";
import type { Location } from "@redocly/openapi-core/lib/ref-utils.d.js";
import type { Problem } from "@redocly/openapi-core/lib/walk.d.js";
import { isValidDateFormat } from "./utils/isValidDateFormat.js";
import { isValidDateTimeFormat } from "./utils/isValidDateTimeFormat.js";

const findInvalidDateExamples = (
  { format, properties, items }: Oas3Schema | Oas3_1Schema,
  example: unknown,
  location: Location,
): Location[] => {
  if (example) {
    if (format === "date") {
      return isValidDateFormat(`${example}`) ? [] : [location];
    }
    if (format === "date-time") {
      return isValidDateTimeFormat(`${example}`) ? [] : [location];
    }
  }

  if (Array.isArray(example) && items) {
    return example
      .map((value, index) =>
        findInvalidDateExamples(
          items as Oas3Schema | Oas3_1Schema,
          example[index],
          location.child(index),
        ),
      )
      .flat();
  }

  if (typeof example === "object" && properties) {
    return Object.entries(properties)
      .map(([key, value]) => findInvalidDateExamples(value, example[key], location.child(key)))
      .flat();
  }

  return [];
};

function findAndReport(
  schema: Oas3Schema | Oas3_1Schema,
  example: unknown,
  location: Location,
  report: (problem: Problem) => void,
) {
  const locations = findInvalidDateExamples(schema, example, location);
  locations.forEach((loc) => {
    report({
      message:
        "Invalid date or date-time format. See https://api.otto.de/portal/guidelines/r100072",
      location: loc,
    });
  });
}

/**
 * @see https://api.otto.de/portal/guidelines/r100072
 */
export const UseCommonDateAndTimeFormat: Oas3Rule = () => {
  // TODO handle anyOf/oneOf/allOf

  return {
    MediaType({ example, examples, schema }, { location, report }) {
      if (!schema) return;

      if (example) {
        const loc = location.child("example");
        findAndReport(schema, example, loc, report);
      }

      if (examples) {
        const loc = location.child("examples");
        Object.entries(examples).forEach(([key, value]) => {
          findAndReport(schema, value, loc.child(key), report);
        });
      }
    },

    Schema(schema, { report, location }) {
      if (schema.type !== "string" && (schema.format === "date-time" || schema.format === "date")) {
        report({
          message: "Type is not string for date-time or date.",
          location: location.child("type"),
        });
      }
      findAndReport(schema, schema.example, location, report);
    },
  };
};
