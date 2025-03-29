"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneGraph = cloneGraph;
const Graph_js_1 = require("../Graph.js");
/**
 * Clone the graph data structures.
 * Nodes references are preserves.
 */
function cloneGraph(graph) {
    const clone = new Graph_js_1.Graph();
    for (let [source, targets] of graph.edges.entries()) {
        targets.forEach((target) => {
            var _a;
            clone.addEdge.apply(clone, [source, target]);
            const edgeWeight = (_a = graph.edgeWeights.get(source)) === null || _a === void 0 ? void 0 : _a.get(target);
            if (edgeWeight) {
                clone.setEdgeWeight(source, target, edgeWeight);
            }
            const edgeProperties = graph.getEdgeProperties(source, target);
            if (edgeProperties) {
                clone.setEdgeProperties(source, target, edgeProperties);
            }
        });
    }
    return clone;
}
