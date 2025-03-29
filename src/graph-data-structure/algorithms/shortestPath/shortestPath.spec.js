"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../../Graph.js");
const serializeGraph_js_1 = require("../../utils/serializeGraph.js");
const shortestPath_js_1 = require("./shortestPath.js");
const shortestPaths_js_1 = require("./shortestPaths.js");
const getPath_js_1 = require("./getPath.js");
(0, vitest_1.describe)("Dijkstra's Shortest Path Algorithm", function () {
    (0, vitest_1.it)('Should compute shortest path on a single edge.', function () {
        const graph = new Graph_js_1.Graph().addEdge('a', 'b');
        (0, vitest_1.expect)((0, shortestPath_js_1.shortestPath)(graph, 'a', 'b')).toEqual({
            nodes: ['a', 'b'],
            weight: 1,
        });
    });
    (0, vitest_1.it)('Should compute shortest path on two edges.', function () {
        const graph = new Graph_js_1.Graph().addEdge('a', 'b').addEdge('b', 'c');
        (0, vitest_1.expect)((0, shortestPath_js_1.shortestPath)(graph, 'a', 'c')).toEqual({
            nodes: ['a', 'b', 'c'],
            weight: 2,
        });
    });
    (0, vitest_1.it)('Should compute shortest path on example from Cormen text (p. 659).', function () {
        const graph = new Graph_js_1.Graph()
            .addEdge('s', 't', 10)
            .addEdge('s', 'y', 5)
            .addEdge('t', 'y', 2)
            .addEdge('y', 't', 3)
            .addEdge('t', 'x', 1)
            .addEdge('y', 'x', 9)
            .addEdge('y', 'z', 2)
            .addEdge('x', 'z', 4)
            .addEdge('z', 'x', 6);
        (0, vitest_1.expect)((0, shortestPath_js_1.shortestPath)(graph, 's', 'z')).toEqual({
            nodes: ['s', 'y', 'z'],
            weight: 5 + 2,
        });
        (0, vitest_1.expect)((0, shortestPath_js_1.shortestPath)(graph, 's', 'x')).toEqual({
            nodes: ['s', 'y', 't', 'x'],
            weight: 5 + 3 + 1,
        });
    });
    (0, vitest_1.it)('Should throw error if source node not in graph.', function () {
        const graph = new Graph_js_1.Graph().addEdge('b', 'c');
        (0, vitest_1.expect)(() => (0, shortestPath_js_1.shortestPath)(graph, 'a', 'c')).toThrowError(/Source node/);
    });
    (0, vitest_1.it)('Should throw error if dest node not in graph.', function () {
        const graph = new Graph_js_1.Graph().addEdge('b', 'c');
        (0, vitest_1.expect)(() => (0, shortestPath_js_1.shortestPath)(graph, 'b', 'g')).toThrowError(/Destination node/);
    });
    (0, vitest_1.it)('Should throw error if no path exists.', function () {
        const graph = new Graph_js_1.Graph().addEdge('a', 'b').addEdge('d', 'e');
        (0, vitest_1.expect)(() => (0, shortestPath_js_1.shortestPath)(graph, 'a', 'e')).toThrowError(/No path/);
    });
    (0, vitest_1.it)('Should be robust to disconnected subgraphs.', function () {
        const graph = new Graph_js_1.Graph().addEdge('a', 'b').addEdge('b', 'c').addEdge('d', 'e');
        (0, vitest_1.expect)((0, shortestPath_js_1.shortestPath)(graph, 'a', 'c')).toEqual({
            nodes: ['a', 'b', 'c'],
            weight: 2,
        });
    });
    (0, vitest_1.it)('Should compute shortest paths.', function () {
        const graph = new Graph_js_1.Graph()
            .addEdge('a', 'b')
            .addEdge('b', 'c')
            .addEdge('a', 'd')
            .addEdge('d', 'c')
            .addEdge('a', 'e')
            .addEdge('e', 'f')
            .addEdge('f', 'c');
        (0, vitest_1.expect)((0, shortestPaths_js_1.shortestPaths)(graph, 'a', 'c')).toEqual([
            { nodes: ['a', 'b', 'c'], weight: 2 },
            { nodes: ['a', 'd', 'c'], weight: 2 },
        ]);
        // check graph has not been mutated
        // we can't perform a deep equal because the order of the elements is not guaranteed
        const postSerializedGraph = (0, serializeGraph_js_1.serializeGraph)(graph);
        (0, vitest_1.expect)(postSerializedGraph.nodes).toContainEqual('a');
        (0, vitest_1.expect)(postSerializedGraph.nodes).toContainEqual('b');
        (0, vitest_1.expect)(postSerializedGraph.nodes).toContainEqual('c');
        (0, vitest_1.expect)(postSerializedGraph.nodes).toContainEqual('d');
        (0, vitest_1.expect)(postSerializedGraph.nodes).toContainEqual('e');
        (0, vitest_1.expect)(postSerializedGraph.nodes).toContainEqual('f');
        (0, vitest_1.expect)(postSerializedGraph.links).toContainEqual({ source: 'a', target: 'b' });
        (0, vitest_1.expect)(postSerializedGraph.links).toContainEqual({ source: 'b', target: 'c' });
        (0, vitest_1.expect)(postSerializedGraph.links).toContainEqual({ source: 'a', target: 'd' });
        (0, vitest_1.expect)(postSerializedGraph.links).toContainEqual({ source: 'd', target: 'c' });
        (0, vitest_1.expect)(postSerializedGraph.links).toContainEqual({ source: 'a', target: 'e' });
        (0, vitest_1.expect)(postSerializedGraph.links).toContainEqual({ source: 'e', target: 'f' });
        (0, vitest_1.expect)(postSerializedGraph.links).toContainEqual({ source: 'f', target: 'c' });
    });
});
(0, vitest_1.describe)('addWeightFunction', () => {
    (0, vitest_1.it)('should return edgeWeight if currentPathWeight is undefined', () => {
        const graph = new Graph_js_1.Graph();
        const params = {
            edgeWeight: 5,
            currentPathWeight: undefined,
            hop: 1,
            graph: graph,
            path: ['a', 'b'],
            previousNode: 'a',
            currentNode: 'b',
            props: undefined,
        };
        (0, vitest_1.expect)((0, getPath_js_1.addWeightFunction)(params)).toBe(5);
    });
    (0, vitest_1.it)('should return the sum of edgeWeight and currentPathWeight', () => {
        const graph = new Graph_js_1.Graph();
        const params = {
            edgeWeight: 5,
            currentPathWeight: 10,
            hop: 1,
            graph: graph,
            path: ['a', 'b'],
            previousNode: 'a',
            currentNode: 'b',
            props: undefined,
        };
        (0, vitest_1.expect)((0, getPath_js_1.addWeightFunction)(params)).toBe(15);
    });
});
(0, vitest_1.describe)('shortestPath with custom weight functions', () => {
    (0, vitest_1.it)('should compute shortest path with default weight function (sum of weights)', () => {
        const graph = new Graph_js_1.Graph().addEdge('a', 'b', 1).addEdge('b', 'c', 2);
        (0, vitest_1.expect)((0, shortestPath_js_1.shortestPath)(graph, 'a', 'c')).toEqual({
            nodes: ['a', 'b', 'c'],
            weight: 3,
        });
    });
    (0, vitest_1.it)('should compute shortest path with a custom weight function', () => {
        const customWeightFn = ({ edgeWeight, currentPathWeight, hop, }) => {
            if (currentPathWeight === undefined) {
                return edgeWeight;
            }
            return currentPathWeight + edgeWeight ** hop;
        };
        const graph = new Graph_js_1.Graph().addEdge('a', 'b', 2).addEdge('b', 'c', 3);
        (0, vitest_1.expect)((0, shortestPath_js_1.shortestPath)(graph, 'a', 'c', customWeightFn)).toEqual({
            nodes: ['a', 'b', 'c'],
            weight: 11,
        });
    });
    (0, vitest_1.it)('should pass correct parameters to custom weight function for a path with 3 nodes', () => {
        const customWeightFn = vitest_1.vi.fn(({ edgeWeight, currentPathWeight, hop }) => {
            if (currentPathWeight === undefined) {
                return edgeWeight;
            }
            return currentPathWeight + edgeWeight ** hop;
        });
        const graph = new Graph_js_1.Graph().addEdge('a', 'b', 1).addEdge('b', 'c', 2);
        (0, shortestPath_js_1.shortestPath)(graph, 'a', 'c', customWeightFn);
        (0, vitest_1.expect)(customWeightFn).toHaveBeenCalledWith({
            edgeWeight: 1,
            currentPathWeight: undefined,
            hop: 1,
            graph: graph,
            previousNode: 'a',
            currentNode: 'b',
            path: ['a', 'b', 'c'],
            props: undefined,
        });
        (0, vitest_1.expect)(customWeightFn).toHaveBeenCalledWith({
            edgeWeight: 2,
            currentPathWeight: 1,
            hop: 2,
            graph: graph,
            previousNode: 'b',
            currentNode: 'c',
            path: ['a', 'b', 'c'],
            props: undefined,
        });
    });
    (0, vitest_1.it)('should compute shortest path with a custom weight function in a graph with multiple paths', () => {
        const customWeightFn = ({ edgeWeight, currentPathWeight }) => {
            if (currentPathWeight === undefined) {
                return edgeWeight;
            }
            return edgeWeight + currentPathWeight;
        };
        const graph = new Graph_js_1.Graph()
            .addEdge('a', 'b', 1)
            .addEdge('b', 'c', 2)
            .addEdge('a', 'd', 1)
            .addEdge('d', 'c', 1);
        (0, vitest_1.expect)((0, shortestPath_js_1.shortestPath)(graph, 'a', 'c', customWeightFn)).toEqual({
            nodes: ['a', 'd', 'c'],
            weight: 2,
        });
    });
});
