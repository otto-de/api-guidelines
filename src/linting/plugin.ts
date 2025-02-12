import type { Plugin } from "@redocly/openapi-core/lib/config";
import { UseTLS } from "./rules/use-tls.js";
import { AlwaysReturnJsonObject } from "./rules/always-return-json-object.js";
import { DefinePermissionsWithScope } from "./rules/define-permissions-with-scope.js";
import { FormatEnumerationUpperSnakeCase } from "./rules/format-enumeration-upper-snake-case.js";
import { NoRequestBodyInGetMethod } from "./rules/no-request-body-in-get-method.js";
import { NotUseNullForEmptyArray } from "./rules/not-use-null-for-empty-array.js";
import { OmitOptionalProperty } from "./rules/omit-optional-property.js";
import { SecureEndpointsWithOAuth20 } from "./rules/secure-endpoints-with-oauth-2.0.js";
import { UseAbsoluteCustomLinkRelationUrl } from "./rules/use-absolute-custom-link-relation-url.js";
import { UseAbsoluteProfileUrl } from "./rules/use-absolute-profile-url.js";
import { UseAuthorizationGrant } from "./rules/use-authorization-grant.js";
import { UseCamelCaseForPropertyName } from "./rules/use-camel-case-for-property-name.js";
import { UseCamelCaseForQueryParameter } from "./rules/use-camel-case-for-query-parameter.js";
import { UseCommonDateAndTimeFormat } from "./rules/use-common-date-and-time-format.js";
import { UseCuriedLinkRelationTypes } from "./rules/use-curied-link-relation-types.js";
import { UseExtensibleEnum } from "./rules/use-extensible-enum.js";
import { UseKebabCaseForPathParameter } from "./rules/use-kebab-case-for-path-parameter.js";
import { UseKebabCaseInUri } from "./rules/use-kebab-case-in-uri.js";
import { UseOas3 } from "./rules/use-oas-3.js";
import { UseStringEnum } from "./rules/use-string-enum.js";
import { Operation4xxProblemDetailsRfc9457 } from "./rules/operation-4xx-problem-details-rfc9457.js";

export const id: Plugin["id"] = "api-guidelines";

export const rules = {
  oas2: {
    "use-oas-3": UseOas3,
  },
  oas3: {
    "always-return-json-object": AlwaysReturnJsonObject,
    "define-permissions-with-scope": DefinePermissionsWithScope,
    "format-enumeration-upper-snake-case": FormatEnumerationUpperSnakeCase,
    "no-request-body-in-get-method": NoRequestBodyInGetMethod,
    "not-use-null-for-empty-array": NotUseNullForEmptyArray,
    "omit-optional-property": OmitOptionalProperty,
    "secure-endpoints-with-oauth-2.0": SecureEndpointsWithOAuth20,
    "use-absolute-custom-link-relation-url": UseAbsoluteCustomLinkRelationUrl,
    "use-absolute-profile-url": UseAbsoluteProfileUrl,
    "use-authorization-grant": UseAuthorizationGrant,
    "use-camel-case-for-property-name": UseCamelCaseForPropertyName,
    "use-camel-case-for-query-parameter": UseCamelCaseForQueryParameter,
    "use-common-date-and-time-format": UseCommonDateAndTimeFormat,
    "use-curied-link-relation-types": UseCuriedLinkRelationTypes,
    "use-extensible-enum": UseExtensibleEnum,
    "use-kebab-case-for-path-parameter": UseKebabCaseForPathParameter,
    "use-kebab-case-in-uri": UseKebabCaseInUri,
    "use-string-enum": UseStringEnum,
    "use-tls": UseTLS,
    "operation-4xx-problem-details-rfc9457": Operation4xxProblemDetailsRfc9457,
  },
};

export const configs = {
  recommended: {
    rules: {
      "info-contact": "error", // https://api.otto.de/portal/guidelines/r000078
      "operation-2xx-response": "error", // https://api.otto.de/portal/guidelines/r000011
      // "operation-4xx-problem-details-rfc9457": "error", // https://api.otto.de/portal/guidelines/r000034
      "api-guidelines/operation-4xx-problem-details-rfc9457": "error", // https://api.otto.de/portal/guidelines/r000034
      "no-path-trailing-slash": "error", // https://api.otto.de/portal/guidelines/r000020
      "api-guidelines/always-return-json-object": "error", // https://api.otto.de/portal/guidelines/r004030
      "api-guidelines/define-permissions-with-scope": "error", // https://api.otto.de/portal/guidelines/r000047
      "api-guidelines/format-enumeration-upper-snake-case": "error", // https://api.otto.de/portal/guidelines/r004090
      "api-guidelines/no-request-body-in-get-method": "error", // https://api.otto.de/portal/guidelines/r000007
      "api-guidelines/not-use-null-for-empty-array": "warn", // https://api.otto.de/portal/guidelines/r004060
      "api-guidelines/omit-optional-property": "warn", // https://api.otto.de/portal/guidelines/r004021
      "api-guidelines/secure-endpoints-with-oauth-2.0": "error", // https://api.otto.de/portal/guidelines/r000051
      "api-guidelines/use-absolute-custom-link-relation-url": "error", // https://api.otto.de/portal/guidelines/r100037
      "api-guidelines/use-absolute-profile-url": "error", // https://api.otto.de/portal/guidelines/r100066
      "api-guidelines/use-authorization-grant": "error", // https://api.otto.de/portal/guidelines/r000052
      "api-guidelines/use-camel-case-for-property-name": "warn", // https://api.otto.de/portal/guidelines/r004010
      "api-guidelines/use-camel-case-for-query-parameter": "error", // https://api.otto.de/portal/guidelines/r000022
      "api-guidelines/use-common-date-and-time-format": "error", // https://api.otto.de/portal/guidelines/r100072
      "api-guidelines/use-curied-link-relation-types": "error", // https://api.otto.de/portal/guidelines/r100038
      "api-guidelines/use-extensible-enum": "warn", // https://api.otto.de/portal/guidelines/r000035
      "api-guidelines/use-kebab-case-for-path-parameter": "off", // TODO guideline rule will follow
      "api-guidelines/use-kebab-case-in-uri": "error", // https://api.otto.de/portal/guidelines/r000023
      "api-guidelines/use-oas-3": "error", // https://api.otto.de/portal/guidelines/r000003
      "api-guidelines/use-string-enum": "error", // https://api.otto.de/portal/guidelines/r004080
      "api-guidelines/use-tls": "error", // https://api.otto.de/portal/guidelines/r000046
    },
  },
};
