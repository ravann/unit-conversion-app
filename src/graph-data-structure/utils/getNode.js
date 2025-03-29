"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNode = getNode;
/**
 * Return the node matching your function. Throws if none is found or if more than one node if found.
 */
function getNode(graph, fn) {
    const foundNodes = [];
    for (const node of graph.nodes) {
        if (fn(node)) {
            foundNodes.push(node);
        }
    }
    if (foundNodes.length === 0) {
        throw new Error('Node not found.');
    }
    if (foundNodes.length > 1) {
        throw new Error('More than one node found.');
    }
    return foundNodes[0];
}
