import { InternMap } from "./InternMap.js";
import { initRange } from "./init.js";

export const implicit = Symbol("implicit");

export default function ordinal() {
  "worklet";

  var index = new InternMap(),
    domain = [],
    range = [],
    unknown = implicit;

  function scale(d) {
    "worklet";

    let i = index.get(d);
    if (i === undefined) {
      if (unknown !== implicit) return unknown;
      index.set(d, (i = domain.push(d) - 1));
    }
    return range[i % range.length];
  }

  scale.domain = function (_) {
    "worklet";

    if (!arguments.length) return domain.slice();
    (domain = []), (index = new InternMap());
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = function (_) {
    "worklet";

    return arguments.length ? ((range = Array.from(_)), scale) : range.slice();
  };

  scale.unknown = function (_) {
    "worklet";

    return arguments.length ? ((unknown = _), scale) : unknown;
  };

  scale.copy = function () {
    "worklet";

    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}
