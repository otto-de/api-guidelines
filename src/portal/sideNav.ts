export default {
  "API Guidelines": {
    "CORE PRINCIPLES": {
      "API design": {
        file: () => import("../../api-guidelines/global/core-principles/api-design.md"),
        path: "/guidelines/core-principles/api-design",
      },
      "API as a product": {
        file: () => import("../../api-guidelines/global/core-principles/api-as-a-product.md"),
        path: "/guidelines/core-principles/api-as-a-product",
      },
      "API scope": {
        file: () => import("../../api-guidelines/global/core-principles/api-scope.md"),
        path: "/guidelines/core-principles/api-scope",
      },
      "Contract first": {
        file: () => import("../../api-guidelines/global/core-principles/contract-first.md"),
        path: "/guidelines/core-principles/contract-first",
      },
      "Quality standards": {
        file: () => import("../../api-guidelines/global/core-principles/quality-standards.md"),
        path: "/guidelines/core-principles/quality-standards",
      },
      "Documentation": {
        file: () => import("../../api-guidelines/global/core-principles/documentation.md"),
        path: "/guidelines/core-principles/documentation",
      },
    },
    "REST GUIDELINES": {
      "Contract": {
        file: () => import("../../api-guidelines/rest/contract/openapi/README.md"),
        path: "/guidelines/rest-guidelines/contract",
      },
      "JSON": {
        file: () => import("../../api-guidelines/global/json/README.md"),
        path: "/guidelines/rest-guidelines/json",
      },
      "Authorization": {
        file: () => import("../../api-guidelines/rest/authorization/README.md"),
        path: "/guidelines/rest-guidelines/authorization",
      },
      "HTTP": {
        file: () => import("../../api-guidelines/rest/http/README.md"),
        path: "/guidelines/rest-guidelines/http",
      },
      "Resources": {
        file: () => import("../../api-guidelines/rest/resources/README.md"),
        path: "/guidelines/rest-guidelines/resources",
      },
      "Hypermedia": {
        file: () => import("../../api-guidelines/rest/hypermedia/README.md"),
        path: "/guidelines/rest-guidelines/hypermedia",
      },
      "Errors": {
        file: () => import("../../api-guidelines/rest/errors/README.md"),
        path: "/guidelines/rest-guidelines/errors",
      },
      "Compatibility": {
        file: () => import("../../api-guidelines/rest/compatibility/README.md"),
        path: "/guidelines/rest-guidelines/compatibility",
      },
    },
    "EVENT GUIDELINES": {
      "Contract": {
        file: () => import("../../api-guidelines/async/contract/README.md"),
        path: "/guidelines/event-guidelines/contract",
      },
      "JSON": {
        file: () => import("../../api-guidelines/global/json/README.md"),
        path: "/guidelines/event-guidelines/json",
      },
      "Concepts": {
        file: () => import("../../api-guidelines/async/concepts/README.md"),
        path: "/guidelines/event-guidelines/concepts",
      },
      "Format": {
        file: () => import("../../api-guidelines/async/format/README.md"),
        path: "/guidelines/event-guidelines/format",
      },
      "Semantics": {
        file: () => import("../../api-guidelines/async/semantics/README.md"),
        path: "/guidelines/event-guidelines/semantics",
      },
      "Kafka": {
        file: () => import("../../api-guidelines/async/kafka/README.md"),
        path: "/guidelines/event-guidelines/kafka",
      },
      "Compatibility": {
        file: () => import("../../api-guidelines/async/compatibility/README.md"),
        path: "/guidelines/event-guidelines/compatibility",
      },
    },
    "REVISION HISTORY": {
      "Changelog": {
        file: () => import("../../changes/changelog.md"),
        path: "/guidelines/changelog",
      },
    },
  },
};
