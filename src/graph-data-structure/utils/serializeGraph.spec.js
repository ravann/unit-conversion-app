"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../Graph.js");
const test_utils_js_1 = require("../test-utils.js");
const serializeGraph_js_1 = require("./serializeGraph.js");
(0, vitest_1.describe)('serializeGraph', () => {
    let serialized;
    (0, vitest_1.it)('Should serialize a graph.', function () {
        const graph = new Graph_js_1.Graph().addEdge('a', 'b').addEdge('b', 'c');
        serialized = (0, serializeGraph_js_1.serializeGraph)(graph);
        (0, test_utils_js_1.checkSerialized)(serialized);
    });
    (0, vitest_1.it)('should use the node identity for link serialization', function () {
        const nodeA = { id: 1, title: 'a' };
        const nodeB = { id: 2, title: 'b' };
        const graph = new Graph_js_1.Graph();
        graph.addEdge(nodeA, nodeB, { props: { type: 'foo' } });
        const serialized = (0, serializeGraph_js_1.serializeGraph)(graph, (n) => n.id);
        (0, vitest_1.expect)(serialized).toStrictEqual({
            nodes: [nodeA, nodeB],
            links: [{ source: 1, target: 2, props: { type: 'foo' } }],
        });
    });
    (0, vitest_1.it)('should reuse the same identity when the node is met multiple times', function () {
        var _a, _b;
        const nodeA = { id: 1, title: 'a' };
        const nodeB = { id: 2, title: 'b' };
        const nodeC = { id: 3, title: 'c' };
        const graph = new Graph_js_1.Graph();
        graph.addEdge(nodeA, nodeC);
        graph.addEdge(nodeB, nodeC);
        // we use an object as identity
        const serialized = (0, serializeGraph_js_1.serializeGraph)(graph, (n) => ({ id: n.id }));
        const nodeIdentityC1 = (_a = serialized.links.find((l) => l.source.id === nodeA.id && l.target.id === nodeC.id)) === null || _a === void 0 ? void 0 : _a.target;
        const nodeIdentityC2 = (_b = serialized.links.find((l) => l.source.id === nodeB.id && l.target.id === nodeC.id)) === null || _b === void 0 ? void 0 : _b.target;
        (0, vitest_1.expect)(nodeIdentityC1).toBeDefined();
        (0, vitest_1.expect)(nodeIdentityC1).toBe(nodeIdentityC2);
    });
    vitest_1.it.skip('should return a serialized input with type inferred from the graph', function () {
        const nodeA = { title: 'a' };
        const nodeB = { title: 'b' };
        const graph = new Graph_js_1.Graph();
        graph.addEdge(nodeA, nodeB, { props: { type: 'foo' } });
        const serialized = (0, serializeGraph_js_1.serializeGraph)(graph);
        (0, vitest_1.expectTypeOf)(serialized).toEqualTypeOf();
    });
});
