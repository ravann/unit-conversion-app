"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWeightFunction = addWeightFunction;
exports.getPath = getPath;
const invariant_js_1 = require("../../invariant.js");
/**
 * Computes edge weight as the sum of all the edges in the path.
 */
function addWeightFunction(wp) {
    if (wp.currentPathWeight === undefined) {
        return wp.edgeWeight;
    }
    return wp.edgeWeight + wp.currentPathWeight;
}
/**
 * Assembles the shortest path by traversing the
 * predecessor subgraph from destination to source.
 */
function getPath(graph, tracks, source, destination, nextWeightFn = addWeightFunction) {
    const { p } = tracks;
    const nodeList = [];
    let node = destination;
    while (p.has(node)) {
        const currentNode = p.get(node);
        nodeList.push(node);
        node = currentNode;
    }
    if (node !== source) {
        throw new Error('No path found');
    }
    nodeList.push(node);
    nodeList.reverse();
    (0, invariant_js_1.invariant)(nodeList.length >= 2, 'The path should have a least two nodes');
    let totalWeight = undefined;
    // We start as index=1 to work on the first edge between node 0 and 1
    for (let i = 1; i < nodeList.length; i++) {
        const previousNode = nodeList[i - 1];
        const currentNode = nodeList[i];
        const edgeWeight = graph.getEdgeWeight(previousNode, currentNode);
        const edgeProps = graph.getEdgeProperties(previousNode, currentNode);
        totalWeight = nextWeightFn({
            edgeWeight,
            currentPathWeight: totalWeight,
            hop: i,
            graph,
            path: nodeList,
            previousNode,
            currentNode,
            props: edgeProps,
        });
    }
    return {
        nodes: nodeList,
        weight: totalWeight,
    };
}
