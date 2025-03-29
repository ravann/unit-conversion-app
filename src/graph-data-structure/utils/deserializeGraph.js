"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeGraph = deserializeGraph;
const Graph_js_1 = require("../Graph.js");
function deserializeGraph(...args) {
    const [data, identityFn] = args;
    const g = new Graph_js_1.Graph();
    const nodeIdentityMap = new Map();
    data.nodes.forEach((node) => {
        g.addNode(node);
        if (identityFn) {
            nodeIdentityMap.set(identityFn(node), node);
        }
    });
    data.links.forEach((link) => {
        var _a, _b;
        if (!identityFn) {
            g.addEdge.apply(g, [link.source, link.target, link.weight, link.props]);
            return;
        }
        const source = (_a = nodeIdentityMap.get(identityFn(link.source))) !== null && _a !== void 0 ? _a : link.source;
        const target = (_b = nodeIdentityMap.get(identityFn(link.target))) !== null && _b !== void 0 ? _b : link.target;
        g.addEdge.apply(g, [source, target, link.weight, link.props]);
    });
    return g;
}
