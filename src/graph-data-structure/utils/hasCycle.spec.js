"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../Graph.js");
const hasCycle_js_1 = require("./hasCycle.js");
(0, vitest_1.describe)('hasCycle', () => {
    (0, vitest_1.it)('should detect cycle.', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b');
        graph.addEdge('b', 'a');
        (0, vitest_1.expect)((0, hasCycle_js_1.hasCycle)(graph)).toBe(true);
    });
    (0, vitest_1.it)('should detect cycle (long).', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b');
        graph.addEdge('b', 'c');
        graph.addEdge('c', 'd');
        graph.addEdge('d', 'a');
        (0, vitest_1.expect)((0, hasCycle_js_1.hasCycle)(graph)).toBe(true);
    });
    (0, vitest_1.it)('should detect cycle (loop).', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'a');
        (0, vitest_1.expect)((0, hasCycle_js_1.hasCycle)(graph)).toBe(true);
    });
    (0, vitest_1.it)('should not detect cycle.', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b');
        (0, vitest_1.expect)((0, hasCycle_js_1.hasCycle)(graph)).toBe(false);
    });
    (0, vitest_1.it)('should ignore the cycle in another sub-graph.', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b');
        graph.addEdge('b', 'c');
        graph.addEdge('c', 'd');
        graph.addEdge('d', 'a');
        graph.addEdge('m', 'n');
        (0, vitest_1.expect)((0, hasCycle_js_1.hasCycle)(graph, { sourceNodes: ['m'] })).toBe(false);
    });
    (0, vitest_1.it)('should not detect the cycle when the traversing is stopped by the shouldFollow option.', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b', { props: 'foo' });
        graph.addEdge('b', 'c', { props: 'foo' });
        graph.addEdge('c', 'd', { props: 'foo' });
        graph.addEdge('d', 'a', { props: 'bar' });
        (0, vitest_1.expect)((0, hasCycle_js_1.hasCycle)(graph, {
            shouldFollow: ({ source, target }) => graph.getEdgeProperties(source, target) === 'foo',
        })).toBe(false);
    });
});
