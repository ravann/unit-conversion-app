"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_js_1 = require("./index.js");
const indegree_js_1 = require("./utils/indegree.js");
const outdegree_js_1 = require("./utils/outdegree.js");
(0, vitest_1.describe)('Graph', function () {
    (0, vitest_1.describe)('Data structure', function () {
        (0, vitest_1.it)('Should add nodes and list them.', function () {
            const graph = new index_js_1.Graph();
            graph.addNode('a');
            graph.addNode('b');
            const nodes = graph.nodes;
            (0, vitest_1.expect)(nodes).toHaveLength(2);
            (0, vitest_1.expect)(nodes).toContain('a');
            (0, vitest_1.expect)(nodes).toContain('b');
        });
        (0, vitest_1.it)('Should chain addNode.', function () {
            const graph = new index_js_1.Graph().addNode('a').addNode('b');
            const nodes = graph.nodes;
            (0, vitest_1.expect)(nodes).toHaveLength(2);
            (0, vitest_1.expect)(nodes).toContain('a');
            (0, vitest_1.expect)(nodes).toContain('b');
        });
        (0, vitest_1.it)('Should remove nodes.', function () {
            const graph = new index_js_1.Graph();
            graph.addNode('a');
            graph.addNode('b');
            graph.removeNode('a');
            graph.removeNode('b');
            const nodes = graph.nodes;
            (0, vitest_1.expect)(nodes).toHaveLength(0);
        });
        (0, vitest_1.it)('Should chain removeNode.', function () {
            const graph = new index_js_1.Graph().addNode('a').addNode('b').removeNode('a').removeNode('b');
            const nodes = graph.nodes;
            (0, vitest_1.expect)(nodes).toHaveLength(0);
        });
        (0, vitest_1.it)('Should add edges and query for adjacent nodes.', function () {
            const graph = new index_js_1.Graph();
            graph.addNode('a');
            graph.addNode('b');
            graph.addEdge('a', 'b');
            const adjacentNodes = graph.adjacent('a');
            (0, vitest_1.expect)(adjacentNodes).toHaveLength(1);
            (0, vitest_1.expect)(adjacentNodes === null || adjacentNodes === void 0 ? void 0 : adjacentNodes.has('b')).toBe(true);
        });
        (0, vitest_1.it)('Should implicitly add nodes when edges are added.', function () {
            const graph = new index_js_1.Graph();
            graph.addEdge('a', 'b');
            const adjacentNodes = graph.adjacent('a');
            (0, vitest_1.expect)(adjacentNodes).toHaveLength(1);
            (0, vitest_1.expect)(adjacentNodes === null || adjacentNodes === void 0 ? void 0 : adjacentNodes.has('b')).toBe(true);
            const nodes = graph.nodes;
            (0, vitest_1.expect)(nodes).toHaveLength(2);
            (0, vitest_1.expect)(nodes).toContain('a');
            (0, vitest_1.expect)(nodes).toContain('b');
        });
        (0, vitest_1.it)('Should chain addEdge.', function () {
            const graph = new index_js_1.Graph().addEdge('a', 'b');
            const adjacentNodes = graph.adjacent('a');
            (0, vitest_1.expect)(adjacentNodes).toHaveLength(1);
            (0, vitest_1.expect)(adjacentNodes === null || adjacentNodes === void 0 ? void 0 : adjacentNodes.has('b')).toBe(true);
        });
        (0, vitest_1.it)('Should remove edges.', function () {
            const graph = new index_js_1.Graph();
            graph.addEdge('a', 'b');
            graph.removeEdge('a', 'b');
            const adjacentNodes = graph.adjacent('a');
            (0, vitest_1.expect)(adjacentNodes).toHaveLength(0);
        });
        (0, vitest_1.it)('Should chain removeEdge.', function () {
            const graph = new index_js_1.Graph().addEdge('a', 'b').removeEdge('a', 'b');
            const adjacentNodes = graph.adjacent('a');
            (0, vitest_1.expect)(adjacentNodes).toHaveLength(0);
        });
        (0, vitest_1.it)('Should not remove nodes when edges are removed.', function () {
            const graph = new index_js_1.Graph();
            graph.addEdge('a', 'b');
            graph.removeEdge('a', 'b');
            const nodes = graph.nodes;
            (0, vitest_1.expect)(nodes).toHaveLength(2);
            (0, vitest_1.expect)(nodes).toContain('a');
            (0, vitest_1.expect)(nodes).toContain('b');
        });
        (0, vitest_1.it)('Should remove outgoing edges when a node is removed.', function () {
            const graph = new index_js_1.Graph();
            graph.addEdge('a', 'b');
            graph.removeNode('a');
            (0, vitest_1.expect)(graph.adjacent('a')).toEqual(undefined);
        });
        (0, vitest_1.it)('Should remove incoming edges when a node is removed.', function () {
            var _a;
            const graph = new index_js_1.Graph();
            graph.addEdge('a', 'b');
            graph.removeNode('b');
            (0, vitest_1.expect)((_a = graph.adjacent('a')) === null || _a === void 0 ? void 0 : _a.size).toEqual(0);
        });
    });
    (0, vitest_1.describe)('Edge cases and error handling', function () {
        (0, vitest_1.it)('Should return undefined for unknown nodes.', function () {
            const graph = new index_js_1.Graph();
            (0, vitest_1.expect)(graph.adjacent('a')).toEqual(undefined);
            (0, vitest_1.expect)(graph.nodes).toHaveLength(0);
        });
        (0, vitest_1.it)('Should do nothing if removing an edge that does not exist.', function () {
            const graph = new index_js_1.Graph();
            (0, vitest_1.expect)(() => graph.removeEdge('a', 'b')).not.toThrowError();
        });
        (0, vitest_1.it)('Should return indegree of 0 for unknown nodes.', function () {
            const graph = new index_js_1.Graph();
            (0, vitest_1.expect)((0, indegree_js_1.indegree)(graph, 'z')).toEqual(0);
        });
        (0, vitest_1.it)('Should return outdegree of 0 for unknown nodes.', function () {
            const graph = new index_js_1.Graph();
            (0, vitest_1.expect)((0, outdegree_js_1.outdegree)(graph, 'z')).toEqual(0);
        });
    });
    (0, vitest_1.describe)('Edge Weights', function () {
        (0, vitest_1.it)('Should set and get an edge weight.', function () {
            const graph = new index_js_1.Graph().addEdge('a', 'b', 5);
            (0, vitest_1.expect)(graph.getEdgeWeight('a', 'b')).toEqual(5);
        });
        (0, vitest_1.it)('Should set edge weight via setEdgeWeight.', function () {
            const graph = new index_js_1.Graph().addEdge('a', 'b').setEdgeWeight('a', 'b', 5);
            (0, vitest_1.expect)(graph.getEdgeWeight('a', 'b')).toEqual(5);
        });
        (0, vitest_1.it)('Should return weight of 1 if no weight set.', function () {
            const graph = new index_js_1.Graph().addEdge('a', 'b');
            (0, vitest_1.expect)(graph.getEdgeWeight('a', 'b')).toEqual(1);
        });
    });
    (0, vitest_1.describe)('hadEdge', function () {
        (0, vitest_1.it)('Should compute hasEdge.', function () {
            const graph = new index_js_1.Graph().addEdge('a', 'b');
            (0, vitest_1.expect)(graph.hasEdge('a', 'b')).toEqual(true);
            (0, vitest_1.expect)(graph.hasEdge('b', 'a')).toEqual(false);
            (0, vitest_1.expect)(graph.hasEdge('c', 'a')).toEqual(false);
        });
    });
});
