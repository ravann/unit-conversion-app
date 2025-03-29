"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../Graph.js");
const getFirstNode_js_1 = require("./getFirstNode.js");
(0, vitest_1.describe)('getFirstNode', () => {
    (0, vitest_1.it)('should retrieve a node successfully when it exists in the graph', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        const node1 = { id: '1', type: 'foo' };
        const node2 = { id: '2', type: 'foo' };
        graph.addNode(node1);
        graph.addNode(node2);
        expect((0, getFirstNode_js_1.getFirstNode)(graph, (n) => n.id === '1')).toEqual(node1);
        expect((0, getFirstNode_js_1.getFirstNode)(graph, (n) => n.id === '2')).toEqual(node2);
    });
    (0, vitest_1.it)('should throw when the node is not found', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        expect(() => (0, getFirstNode_js_1.getFirstNode)(graph, (n) => n.id === 'nope')).toThrowError();
    });
    (0, vitest_1.it)('should not throw when more than one node is found', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        const node1 = { id: '1', type: 'foo' };
        const node2 = { id: '2', type: 'foo' };
        graph.addNode(node1);
        graph.addNode(node2);
        expect((0, getFirstNode_js_1.getFirstNode)(graph, (n) => n.type === 'foo')).toEqual(node1);
    });
});
