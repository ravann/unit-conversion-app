"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indegree = indegree;
/**
 * Computes the indegree for the given node.
 * Not very efficient, costs O(E) where E = number of edges.
 */
function indegree(graph, node) {
    let degree = 0;
    for (const adjacentNodes of graph.edges.values()) {
        for (let adjacentNode of adjacentNodes) {
            if (adjacentNode === node) {
                degree++;
            }
        }
    }
    return degree;
}
