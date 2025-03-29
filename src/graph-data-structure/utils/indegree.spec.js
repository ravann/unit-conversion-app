"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../Graph.js");
const indegree_js_1 = require("./indegree.js");
(0, vitest_1.describe)('indegree', () => {
    (0, vitest_1.it)('Should compute indegree.', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b');
        (0, vitest_1.expect)((0, indegree_js_1.indegree)(graph, 'a')).toEqual(0);
        (0, vitest_1.expect)((0, indegree_js_1.indegree)(graph, 'b')).toEqual(1);
        graph.addEdge('c', 'b');
        (0, vitest_1.expect)((0, indegree_js_1.indegree)(graph, 'b')).toEqual(2);
    });
});
