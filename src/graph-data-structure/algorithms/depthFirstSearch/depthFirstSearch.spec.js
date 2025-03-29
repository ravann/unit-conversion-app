"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../../Graph.js");
const index_js_1 = require("./index.js");
(0, vitest_1.describe)('depthFirstSearch', () => {
    (0, vitest_1.it)('Should return the nodes connected to the source node with the correct type of edge.', function () {
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b', { props: { type: 'foo' } });
        graph.addEdge('b', 'c', { props: { type: 'bar' } });
        graph.addEdge('b', 'd', { props: { type: 'bar' } });
        graph.addEdge('b', 'e', { props: { type: 'foo' } });
        const nodes = (0, index_js_1.depthFirstSearch)(graph, {
            shouldFollow: ({ props }) => props.type === 'foo',
        });
        (0, vitest_1.expect)(nodes).toContain('a');
        (0, vitest_1.expect)(nodes).toContain('b');
        (0, vitest_1.expect)(nodes).toContain('e');
    });
    (0, vitest_1.it)('should pass all the expected args to the shouldFollow function', function () {
        vitest_1.expect.hasAssertions();
        const graph = new Graph_js_1.Graph();
        graph.addEdge('a', 'b', { props: { type: 'foo' } });
        (0, index_js_1.depthFirstSearch)(graph, {
            shouldFollow: ({ source, target, props }) => {
                (0, vitest_1.expect)(source).toEqual(vitest_1.expect.any(String));
                (0, vitest_1.expect)(target).toEqual(vitest_1.expect.any(String));
                (0, vitest_1.expect)(props).toEqual({ type: 'foo' });
                return true;
            },
        });
    });
});
