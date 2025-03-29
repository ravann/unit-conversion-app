"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depthFirstSearch = depthFirstSearch;
const depthFirstVisit_js_1 = require("./depthFirstVisit.js");
/**
 * Depth First Search algorithm, inspired by
 * Cormen et al. "Introduction to Algorithms" 3rd Ed. p. 604
 */
function depthFirstSearch(graph, opts = {}) {
    var _a;
    const { sourceNodes = Array.from(graph.nodes), includeSourceNodes = true } = opts;
    const visited = new Set();
    const visiting = new Set();
    const nodeList = [];
    if (includeSourceNodes) {
        for (let i = 0; i < sourceNodes.length; i++) {
            const sourceNode = sourceNodes[i];
            if (!sourceNode)
                continue;
            (0, depthFirstVisit_js_1.depthFirstVisit)(graph, nodeList, visited, visiting, sourceNode, opts);
        }
        return nodeList;
    }
    for (let i = 0; i < sourceNodes.length; i++) {
        const sourceNode = sourceNodes[i];
        if (!sourceNode)
            continue;
        visited.add(sourceNode);
    }
    for (let i = 0; i < sourceNodes.length; i++) {
        const sourceNode = sourceNodes[i];
        if (!sourceNode)
            continue;
        (_a = graph
            .adjacent(sourceNode)) === null || _a === void 0 ? void 0 : _a.forEach((n) => (0, depthFirstVisit_js_1.depthFirstVisit)(graph, nodeList, visited, visiting, n, opts));
    }
    return nodeList;
}
