"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dijkstra = dijkstra;
const extractMin_js_1 = require("./extractMin.js");
const relax_js_1 = require("./relax.js");
function dijkstra(graph, tracks, source, destination) {
    var _a;
    const nodes = graph.nodes;
    const { q } = tracks;
    initializeSingleSource(nodes, tracks, source, destination);
    initializePriorityQueue(nodes, tracks);
    while (q.size !== 0) {
        const u = (0, extractMin_js_1.extractMin)(tracks);
        if (u === null)
            return;
        (_a = graph.adjacent(u)) === null || _a === void 0 ? void 0 : _a.forEach((v) => {
            (0, relax_js_1.relax)(graph, tracks, u, v);
        });
    }
}
function initializeSingleSource(nodes, { d }, source, destination) {
    nodes.forEach((node) => {
        d.set(node, Infinity);
    });
    if (d.get(source) !== Infinity) {
        throw new Error('Source node is not in the graph');
    }
    if (d.get(destination) !== Infinity) {
        throw new Error('Destination node is not in the graph');
    }
    d.set(source, 0);
}
function initializePriorityQueue(nodes, { q }) {
    nodes.forEach((node) => {
        q.add(node);
    });
}
