import { Oas3Rule } from "@redocly/openapi-core/lib/visitors";

/**
 * @see https://api.otto.de/portal/guidelines/r000035
 */
export const UseExtensibleEnum: Oas3Rule = () => {
  return {
    Schema(schema, { report, location }) {
      const extensibleEnum = schema["x-extensible-enum"];

      if (!extensibleEnum) return;

      if (schema.enum) {
        report({
          message:
            "Do not use the enum keyword in combination with x-extensible-enum. See https://api.otto.de/portal/guidelines/r000035",
          location: [location.child("enum"), location.child("x-extensible-enum")],
        });
      }

      if (schema.type !== "string") {
        report({
          message:
            "Extensible enum is not represented as string. See https://api.otto.de/portal/guidelines/r000035",
          location: location.child("type"),
        });
      }

      if (!Array.isArray(extensibleEnum)) {
        report({
          message:
            "x-extensible-enum is not an array. See https://api.otto.de/portal/guidelines/r000035",
          location: location.child("x-extensible-enum"),
        });

        return;
      }

      extensibleEnum.forEach((extensibleEnumValue, index) => {
        const { value, description, deprecated, preview } = extensibleEnumValue;

        const loc = location.child("x-extensible-enum").child(index);

        if (!value) {
          report({
            message:
              "x-extensible-enum has no value. See https://api.otto.de/portal/guidelines/r000035",
            location: loc,
          });
        }

        if (!description) {
          report({
            message:
              "x-extensible-enum has no description. See https://api.otto.de/portal/guidelines/r000035",
            location: loc,
          });
        }

        if ("deprecated" in extensibleEnumValue && typeof deprecated !== "boolean") {
          report({
            message: "deprecated is not boolean. See https://api.otto.de/portal/guidelines/r000035",
            location: loc.child("deprecated"),
          });
        }

        if ("preview" in extensibleEnumValue && typeof preview !== "boolean") {
          report({
            message: "preview is not boolean. See https://api.otto.de/portal/guidelines/r000035",
            location: loc.child("preview"),
          });
        }
      });
    },
  };
};
