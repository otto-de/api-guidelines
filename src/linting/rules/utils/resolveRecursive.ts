import { ResolveFn, ResolveResult } from "@redocly/openapi-core/lib/walk";
import type { OasRef } from "@redocly/openapi-core";

export const resolveRecursive = <T extends OasRef>(
  node: T,
  resolve: ResolveFn,
  from?: string
): ResolveResult<T> => {
  const resolvedNode = resolve(node, from);

  if (node === resolvedNode.node) return resolvedNode;

  return resolveRecursive(
    resolvedNode.node,
    resolve,
    resolvedNode.location?.source.absoluteRef ?? from
  );
};
