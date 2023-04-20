import { Oas3Rule } from "@redocly/openapi-core/lib/visitors";
import { isAbsoluteURI } from "./utils/isAbsoluteURI";

/**
 * @see  https://api.otto.de/portal/guidelines/r100066
 */
export const UseAbsoluteProfileUrl: Oas3Rule = () => {
  return {
    MediaTypesMap(mediaTypes, { location, report }) {
      Object.keys(mediaTypes).forEach((mediaType, index) => {
        const match = mediaType.match(/profile=(?:"([^"]+)"|([^;]+))/i);

        if (match) {
          const url = match[1] ?? match[2];

          if (!isAbsoluteURI(url)) {
            report({
              message:
                "Profile url is not absolute. See https://api.otto.de/portal/guidelines/r100066",
              location: location.child(index).key(),
            });
          }
        }
      });
    },
  };
};
