"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topologicalSort = topologicalSort;
const index_js_1 = require("../depthFirstSearch/index.js");
function topologicalSort(graph, opts = {}) {
    return (0, index_js_1.depthFirstSearch)(graph, Object.assign(Object.assign({}, opts), { errorOnCycle: true })).reverse();
}
