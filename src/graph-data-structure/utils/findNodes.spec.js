"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../Graph.js");
const findNodes_js_1 = require("./findNodes.js");
(0, vitest_1.describe)('findNodes', () => {
    (0, vitest_1.it)('should retrieve a node successfully when it exists in the graph', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        const node1 = { id: '1', type: 'foo' };
        const node2 = { id: '2', type: 'foo' };
        graph.addNode(node1);
        graph.addNode(node2);
        expect((0, findNodes_js_1.findNodes)(graph, (n) => n.id === '1')).toEqual([node1]);
        expect((0, findNodes_js_1.findNodes)(graph, (n) => n.id === '2')).toEqual([node2]);
    });
    (0, vitest_1.it)('should return an empty array when no matching node is found', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        expect((0, findNodes_js_1.findNodes)(graph, (n) => n.id === 'nope')).toEqual([]);
    });
    (0, vitest_1.it)('should return all the nodes matching', ({ expect }) => {
        const graph = new Graph_js_1.Graph();
        const node1 = { id: '1', type: 'foo' };
        const node2 = { id: '2', type: 'foo' };
        graph.addNode(node1);
        graph.addNode(node2);
        expect((0, findNodes_js_1.findNodes)(graph, (n) => n.type === 'foo')).toEqual([node1, node2]);
    });
});
