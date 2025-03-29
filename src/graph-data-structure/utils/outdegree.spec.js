"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../Graph.js");
const outdegree_js_1 = require("./outdegree.js");
(0, vitest_1.describe)('outdegree', () => {
    (0, vitest_1.it)('Should compute outdegree.', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b');
        (0, vitest_1.expect)((0, outdegree_js_1.outdegree)(graph, 'a')).toEqual(1);
        (0, vitest_1.expect)((0, outdegree_js_1.outdegree)(graph, 'b')).toEqual(0);
        graph.addEdge('a', 'c');
        (0, vitest_1.expect)((0, outdegree_js_1.outdegree)(graph, 'a')).toEqual(2);
    });
});
