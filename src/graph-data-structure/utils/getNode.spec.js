"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../Graph.js");
const getNode_js_1 = require("./getNode.js");
(0, vitest_1.describe)('getNode', () => {
    (0, vitest_1.it)('should retrieve a node successfully when it exists in the graph', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        const node1 = { id: '1', type: 'foo' };
        const node2 = { id: '2', type: 'foo' };
        graph.addNode(node1);
        graph.addNode(node2);
        expect((0, getNode_js_1.getNode)(graph, (n) => n.id === '1')).toEqual(node1);
        expect((0, getNode_js_1.getNode)(graph, (n) => n.id === '2')).toEqual(node2);
    });
    (0, vitest_1.it)('should throw when the node is not found', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        expect(() => (0, getNode_js_1.getNode)(graph, (n) => n.id === 'nope')).toThrowError();
    });
    (0, vitest_1.it)('should throw when more than one node is found', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        const node1 = { id: '1', type: 'foo' };
        const node2 = { id: '2', type: 'foo' };
        graph.addNode(node1);
        graph.addNode(node2);
        expect(() => (0, getNode_js_1.getNode)(graph, (n) => n.type === 'foo')).toThrowError();
    });
    vitest_1.it.skip('should not trigger a type error when the link props are set', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        const node1 = { id: '1', type: 'foo' };
        graph.addNode(node1);
        expect((0, getNode_js_1.getNode)(graph, (n) => n.id === '1')).toEqual(node1);
    });
});
