import type { OasRef, UserContext } from "@redocly/openapi-core";

type ResolveFn = UserContext["resolve"];
type ResolveResult<T> = ReturnType<ResolveFn> & { node: T };

export const resolveRecursive = <T extends OasRef>(
  node: T,
  resolve: ResolveFn,
  from?: string,
): ResolveResult<T> => {
  const resolvedNode = resolve(node, from);

  if (node === resolvedNode.node) return resolvedNode;

  return resolveRecursive(
    resolvedNode.node,
    resolve,
    resolvedNode.location?.source.absoluteRef ?? from,
  );
};
