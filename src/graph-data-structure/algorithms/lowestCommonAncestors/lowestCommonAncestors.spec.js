"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Graph_js_1 = require("../../Graph.js");
const lowestCommonAncestors_js_1 = require("./lowestCommonAncestors.js");
(0, vitest_1.describe)('lowestCommonAncestors', () => {
    (0, vitest_1.it)('Should compute lowest common ancestors.', function () {
        const graph = new Graph_js_1.Graph()
            .addEdge('a', 'b')
            .addEdge('b', 'd')
            .addEdge('c', 'd')
            .addEdge('b', 'e')
            .addEdge('c', 'e')
            .addEdge('d', 'g')
            .addEdge('e', 'g')
            .addNode('f');
        (0, vitest_1.expect)((0, lowestCommonAncestors_js_1.lowestCommonAncestors)(graph, 'a', 'a')).toEqual(['a']);
        (0, vitest_1.expect)((0, lowestCommonAncestors_js_1.lowestCommonAncestors)(graph, 'a', 'b')).toEqual(['b']);
        (0, vitest_1.expect)((0, lowestCommonAncestors_js_1.lowestCommonAncestors)(graph, 'a', 'c')).toEqual(['d', 'e']);
        (0, vitest_1.expect)((0, lowestCommonAncestors_js_1.lowestCommonAncestors)(graph, 'a', 'f')).toEqual([]);
    });
});
