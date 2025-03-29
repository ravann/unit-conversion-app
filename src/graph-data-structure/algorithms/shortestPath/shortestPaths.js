"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortestPaths = shortestPaths;
const shortestPath_js_1 = require("./shortestPath.js");
function shortestPaths(graph, source, destination) {
    let path = (0, shortestPath_js_1.shortestPath)(graph, source, destination);
    const paths = [path];
    const pathWeight = path.weight;
    const removedEdges = [];
    while (path.weight) {
        const u = path.nodes[0];
        const v = path.nodes[1];
        if (graph.hasEdge(u, v)) {
            removedEdges.push({
                u,
                v,
                weight: graph.getEdgeWeight(u, v),
                props: graph.getEdgeProperties(u, v),
            });
            graph.removeEdge(u, v);
        }
        if (graph.hasEdge(v, u)) {
            removedEdges.push({
                u: v,
                v: u,
                weight: graph.getEdgeWeight(v, u),
                props: graph.getEdgeProperties(v, u),
            });
            graph.removeEdge(v, u);
        }
        try {
            path = (0, shortestPath_js_1.shortestPath)(graph, source, destination);
            if (!path.weight || !pathWeight || pathWeight < path.weight)
                break;
            paths.push(path);
        }
        catch (e) {
            break;
        }
    }
    for (const { u, v, weight, props } of removedEdges) {
        graph.addEdge(u, v, ...[weight, props]);
    }
    return paths;
}
