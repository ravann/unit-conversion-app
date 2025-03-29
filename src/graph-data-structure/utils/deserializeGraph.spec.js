"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../Graph.js");
const test_utils_js_1 = require("../test-utils.js");
const deserializeGraph_js_1 = require("./deserializeGraph.js");
const serializeGraph_js_1 = require("./serializeGraph.js");
(0, vitest_1.describe)('serializeGraph', () => {
    (0, vitest_1.it)('should deserialize a graph', () => {
        const g = new Graph_js_1.Graph().addEdge('a', 'b').addEdge('b', 'c');
        const serialized = (0, serializeGraph_js_1.serializeGraph)(g);
        const graph = (0, deserializeGraph_js_1.deserializeGraph)(serialized);
        (0, test_utils_js_1.checkSerialized)((0, serializeGraph_js_1.serializeGraph)(graph));
    });
    (0, vitest_1.it)('should not duplicate nodes when they are objects', () => {
        const nodeA = { id: 1, title: 'a' };
        const nodeB = { id: 2, title: 'b' };
        const stringData = JSON.stringify({
            nodes: [nodeA, nodeB],
            links: [{ source: nodeA, target: nodeB, props: { type: 'foo' } }],
        });
        const serializedGraph = JSON.parse(stringData);
        const graph = (0, deserializeGraph_js_1.deserializeGraph)(serializedGraph, (n) => n.id);
        (0, vitest_1.expect)(graph.nodes).toHaveLength(2);
    });
    vitest_1.it.skip('should return a graph with type inferred from the input', () => {
        const nodeA = { id: 1, title: 'a' };
        const nodeB = { id: 2, title: 'b' };
        const serialized = {
            nodes: [nodeA, nodeB],
            links: [{ source: nodeA, target: nodeB, props: { type: 'foo' } }],
        };
        const graph = (0, deserializeGraph_js_1.deserializeGraph)(serialized, (n) => n.id);
        (0, vitest_1.expectTypeOf)(graph).toEqualTypeOf();
    });
    vitest_1.it.skip('should require an identity function when nodes are objects', () => {
        const nodeA = { id: 1, title: 'a' };
        const nodeB = { id: 2, title: 'b' };
        const serialized = {
            nodes: [nodeA, nodeB],
            links: [{ source: nodeA, target: nodeB, props: { type: 'foo' } }],
        };
        // @ts-expect-error Missing identity function
        (0, deserializeGraph_js_1.deserializeGraph)(serialized);
    });
});
