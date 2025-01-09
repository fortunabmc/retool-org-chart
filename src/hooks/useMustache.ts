import Mustache from "mustache";

import type { OpeningAndClosingTags } from "mustache";

export function useMustache<T>(delimeters: OpeningAndClosingTags) {
  return (template: string, view: T) => {
    return Mustache.render(template, view, {}, delimeters);
  };
}
