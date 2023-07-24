import { Oas3Rule } from "@redocly/openapi-core/lib/visitors";
import { isCamelCase } from "./utils/isCamelCase";

/**
 * @see https://api.otto.de/portal/guidelines/r004010
 */
export const UseCamelCaseForPropertyName: Oas3Rule = () => {
  let isWithinMediaType = false;
  let isHalSchema = false;

  const isReservedHALKey = (key: string | number) => `${key}`.startsWith("_");

  return {
    MediaType: {
      enter() {
        isWithinMediaType = true;
      },
      leave() {
        isWithinMediaType = false;
      },
    },

    Schema: {
      skip() {
        return !isWithinMediaType;
      },

      enter(_, { key }) {
        if (isReservedHALKey(key)) {
          isHalSchema = true;
        }
      },

      leave(_, { key }) {
        if (isReservedHALKey(key)) {
          isHalSchema = false;
        }
      },

      SchemaProperties: {
        skip() {
          return isHalSchema;
        },

        enter(properties, { report, location }) {
          Object.keys(properties)
            .filter((key) => !isReservedHALKey(key))
            .filter((key) => !isCamelCase(key))
            .forEach((key) => {
              report({
                message: `Property "${key}" is not camelCase. See https://api.otto.de/portal/guidelines/r004010`,
                location: location.child(key).key(),
              });
            });
        },
      },
    },
  };
};
