"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeGraph = serializeGraph;
/**
 * Serialize the graph data set : nodes, edges, edges weight & properties.
 *
 * Optionally, you can pass a function that returns a unique value for a given node.
 * When provided, the function will be used to avoid data duplication in the serialized object.
 */
function serializeGraph(graph, ...args) {
    const identityFn = typeof args[0] === 'function' ? args[0] : undefined;
    const opts = typeof args[0] === 'function' ? args[1] : args[0];
    const { includeDefaultWeight = false } = opts !== null && opts !== void 0 ? opts : {};
    const serialized = {
        nodes: Array.from(graph.nodes),
        links: [],
    };
    const nodeIdentityMap = new Map();
    serialized.nodes.forEach((node) => {
        var _a;
        const source = node;
        (_a = graph.adjacent(source)) === null || _a === void 0 ? void 0 : _a.forEach((target) => {
            var _a, _b;
            const edgeWeight = graph.getEdgeWeight(source, target);
            const edgeProps = graph.getEdgeProperties(source, target);
            if (identityFn && !nodeIdentityMap.has(source)) {
                nodeIdentityMap.set(source, identityFn(source));
            }
            if (identityFn && !nodeIdentityMap.has(target)) {
                nodeIdentityMap.set(target, identityFn(target));
            }
            const sourceIdentity = (_a = nodeIdentityMap.get(source)) !== null && _a !== void 0 ? _a : source;
            const targetIdentity = (_b = nodeIdentityMap.get(target)) !== null && _b !== void 0 ? _b : target;
            const link = {
                source: sourceIdentity,
                target: targetIdentity,
            };
            if (edgeWeight != 1 || includeDefaultWeight) {
                link.weight = edgeWeight;
            }
            if (edgeProps) {
                link.props = edgeProps;
            }
            serialized.links.push(link);
        });
    });
    return serialized;
}
