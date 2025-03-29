"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstNode = getFirstNode;
/**
 * Return the first node matching your function and throws if none is found.
 */
function getFirstNode(graph, fn) {
    for (const node of graph.nodes) {
        if (fn(node)) {
            return node;
        }
    }
    throw new Error('Node not found.');
}
