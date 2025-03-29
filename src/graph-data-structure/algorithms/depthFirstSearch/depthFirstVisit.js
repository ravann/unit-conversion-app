"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depthFirstVisit = depthFirstVisit;
const CycleError_js_1 = require("../../CycleError.js");
function depthFirstVisit(graph, nodeList, visited, visiting, node, opts) {
    var _a;
    const { errorOnCycle = false, shouldFollow } = opts;
    if (visiting.has(node) && errorOnCycle) {
        throw new CycleError_js_1.CycleError('Cycle found');
    }
    if (!visited.has(node)) {
        visited.add(node);
        visiting.add(node);
        (_a = graph.adjacent(node)) === null || _a === void 0 ? void 0 : _a.forEach((n) => {
            const follow = shouldFollow === undefined ||
                shouldFollow({
                    source: node,
                    target: n,
                    graph,
                    props: graph.getEdgeProperties(node, n),
                });
            if (!follow)
                return;
            depthFirstVisit(graph, nodeList, visited, visiting, n, opts);
        });
        visiting.delete(node);
        nodeList.push(node);
    }
}
