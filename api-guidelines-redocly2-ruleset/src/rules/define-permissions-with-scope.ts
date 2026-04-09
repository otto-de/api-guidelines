import type { Oas3Rule, Location } from "@redocly/openapi-core";

/**
 * @see https://api.otto.de/portal/guidelines/r000047
 */
export const DefinePermissionsWithScope: Oas3Rule = () => {
  const definedScopes = new Set<string>();
  const usedScopes: [string, Location][] = [];

  return {
    SecurityScheme(scheme) {
      if (scheme.type !== "oauth2") return;
      Object.values(scheme.flows ?? {})
        .flatMap((flow) => Object.keys(flow.scopes ?? {}))
        .forEach((scope) => definedScopes.add(scope));
    },

    SecurityRequirement(securityRequirement, { location }) {
      Object.values(securityRequirement ?? {})
        .flat()
        .forEach((scope) => usedScopes.push([scope, location]));
    },

    Root: {
      leave(_, { report, location }) {
        if (definedScopes.size === 0) {
          report({
            message: "Must define a scope. See https://api.otto.de/portal/guidelines/r000047",
            location: location.child("components").child("securitySchemes").key(),
          });
        }

        usedScopes.forEach(([scope, scopeLocation]) => {
          if (!definedScopes.has(scope)) {
            report({
              message: `Scope "${scope}" is not defined. See https://api.otto.de/portal/guidelines/r000047`,
              location: scopeLocation,
            });
          }
        });
      },
    },
  };
};
