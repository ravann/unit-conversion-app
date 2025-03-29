"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../../Graph.js");
const test_utils_js_1 = require("../../test-utils.js");
const index_js_1 = require("./index.js");
(0, vitest_1.describe)('topologicalSort', () => {
    // This example is from Cormen et al. "Introduction to Algorithms" page 550
    (0, vitest_1.it)('Should compute topological sort.', function () {
        const graph = new Graph_js_1.Graph();
        // Shoes depend on socks.
        // Socks need to be put on before shoes.
        graph.addEdge('socks', 'shoes');
        graph.addEdge('shirt', 'belt');
        graph.addEdge('shirt', 'tie');
        graph.addEdge('tie', 'jacket');
        graph.addEdge('belt', 'jacket');
        graph.addEdge('pants', 'shoes');
        graph.addEdge('underpants', 'pants');
        graph.addEdge('pants', 'belt');
        const sorted = (0, index_js_1.topologicalSort)(graph);
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'pants', 'shoes')).toBe(true);
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'underpants', 'pants')).toBe(true);
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'underpants', 'shoes')).toBe(true);
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'shirt', 'jacket')).toBe(true);
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'shirt', 'belt')).toBe(true);
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'belt', 'jacket')).toBe(true);
        (0, vitest_1.expect)(sorted.length).toEqual(8);
    });
    (0, vitest_1.it)('Should compute topological sort, excluding source nodes.', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b');
        graph.addEdge('b', 'c');
        const sorted = (0, index_js_1.topologicalSort)(graph, {
            sourceNodes: ['a'],
            includeSourceNodes: false,
        });
        (0, vitest_1.expect)(sorted.length).toEqual(2);
        (0, vitest_1.expect)(sorted[0]).toEqual('b');
        (0, vitest_1.expect)(sorted[1]).toEqual('c');
    });
    (0, vitest_1.it)('Should compute topological sort tricky case.', function () {
        //     a
        //    / \
        //   b   |
        //   |   d
        //   c   |
        //    \ /
        //     e
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b');
        graph.addEdge('a', 'd');
        graph.addEdge('b', 'c');
        graph.addEdge('d', 'e');
        graph.addEdge('c', 'e');
        const sorted = (0, index_js_1.topologicalSort)(graph, {
            sourceNodes: ['a'],
            includeSourceNodes: false,
        });
        (0, vitest_1.expect)(sorted.length).toEqual(4);
        (0, vitest_1.expect)(sorted).toContain('b');
        (0, vitest_1.expect)(sorted).toContain('c');
        (0, vitest_1.expect)(sorted).toContain('d');
        (0, vitest_1.expect)(sorted[sorted.length - 1]).toEqual('e');
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'b', 'c')).toBe(true);
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'b', 'e')).toBe(true);
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'c', 'e')).toBe(true);
        (0, vitest_1.expect)((0, test_utils_js_1.comesBefore)(sorted, 'd', 'e')).toBe(true);
    });
    (0, vitest_1.it)('Should exclude source nodes with a cycle.', function () {
        const graph = new Graph_js_1.Graph();
        graph
            .addEdge('a', 'b', { props: { type: 'foo' } })
            .addEdge('b', 'c', { props: { type: 'foo' } })
            .addEdge('c', 'a', { props: { type: 'bar' } });
        const sorted = (0, index_js_1.topologicalSort)(graph, {
            sourceNodes: ['a'],
            includeSourceNodes: true,
            shouldFollow: ({ props }) => props.type === 'foo',
        });
        (0, vitest_1.expect)(sorted.length).toEqual(3);
        (0, vitest_1.expect)(sorted[0]).toEqual('a');
        (0, vitest_1.expect)(sorted[1]).toEqual('b');
        (0, vitest_1.expect)(sorted[2]).toEqual('c');
    });
    (0, vitest_1.it)('Should exclude source nodes with multiple cycles.', function () {
        const graph = new Graph_js_1.Graph()
            .addEdge('a', 'b')
            .addEdge('b', 'a')
            .addEdge('b', 'c')
            .addEdge('c', 'b')
            .addEdge('a', 'c')
            .addEdge('c', 'a');
        const sorted = (0, index_js_1.topologicalSort)(graph, {
            sourceNodes: ['a', 'b'],
            includeSourceNodes: false,
        });
        (0, vitest_1.expect)(sorted).not.toContain('b');
    });
    (0, vitest_1.it)('Should error on non-DAG topological sort', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b');
        graph.addEdge('b', 'a');
        (0, vitest_1.expect)(() => (0, index_js_1.topologicalSort)(graph)).toThrowError();
    });
});
