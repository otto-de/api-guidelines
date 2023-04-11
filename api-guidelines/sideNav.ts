export default {
  "API Guidelines": {
    "CORE PRINCIPLES": {
      "API design": {
        file: () => import("./global/core-principles/api-design.md"),
        path: "/guidelines/core-principles/api-design",
      },
      "API as a product": {
        file: () => import("./global/core-principles/api-as-a-product.md"),
        path: "/guidelines/core-principles/api-as-a-product",
      },
      "API scope": {
        file: () => import("./global/core-principles/api-scope.md"),
        path: "/guidelines/core-principles/api-scope",
      },
      "Contract first": {
        file: () => import("./global/core-principles/contract-first.md"),
        path: "/guidelines/core-principles/contract-first",
      },
      "Quality standards": {
        file: () => import("./global/core-principles/quality-standards.md"),
        path: "/guidelines/core-principles/quality-standards",
      },
      "Documentation": {
        file: () => import("./global/core-principles/documentation.md"),
        path: "/guidelines/core-principles/documentation",
      },
    },
    "GENERAL GUIDELINES": {
      "Basics": {
        file: () => import("./global/basic-concepts/README.md"),
        path: "/guidelines/general-guidelines/basics",
      },
      "JSON": {
        file: () => import("./global/json/README.md"),
        path: "/guidelines/general-guidelines/json",
      },
      "Compatibility": {
        file: () => import("./global/compatibility/README.md"),
        path: "/guidelines/general-guidelines/compatibility",
      },
    },
    "REST GUIDELINES": {
      "Contract": {
        file: () => import("./rest/contract/openapi/README.md"),
        path: "/guidelines/rest-guidelines/contract",
      },
      "Authorization": {
        file: () => import("./rest/authorization/README.md"),
        path: "/guidelines/rest-guidelines/authorization",
      },
      "HTTP": {
        file: () => import("./rest/http/README.md"),
        path: "/guidelines/rest-guidelines/http",
      },
      "Resources": {
        file: () => import("./rest/resources/README.md"),
        path: "/guidelines/rest-guidelines/resources",
      },
      "Hypermedia": {
        file: () => import("./rest/hypermedia/README.md"),
        path: "/guidelines/rest-guidelines/hypermedia",
      },
      "Errors": {
        file: () => import("./rest/errors/README.md"),
        path: "/guidelines/rest-guidelines/errors",
      },
      "Compatibility": {
        file: () => import("./rest/compatibility/README.md"),
        path: "/guidelines/rest-guidelines/compatibility",
      },
    },
    "EVENT GUIDELINES": {
      "Concepts": {
        file: () => import("./async/concepts/README.md"),
        path: "/guidelines/event-guidelines/concepts",
      },
      "Contract": {
        file: () => import("./async/contract/README.md"),
        path: "/guidelines/event-guidelines/contract",
      },
      "Format": {
        file: () => import("./async/format/README.md"),
        path: "/guidelines/event-guidelines/format",
      },
      "Semantics": {
        file: () => import("./async/semantics/README.md"),
        path: "/guidelines/event-guidelines/semantics",
      },
      "Kafka": {
        file: () => import("./async/kafka/README.md"),
        path: "/guidelines/event-guidelines/kafka",
      },
      "Compatibility": {
        file: () => import("./async/compatibility/README.md"),
        path: "/guidelines/event-guidelines/compatibility",
      },
    },
    "REVISION HISTORY": {
      "Changelog": {
        file: () => import("../changes/changelog.md"),
        path: "/guidelines/changelog",
      },
    },
  },
};
