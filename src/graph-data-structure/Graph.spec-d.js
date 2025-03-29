"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_js_1 = require("./index.js");
/**
 * Those tests are not run. Their sole purpose is to test the types.
 */
(0, vitest_1.describe)('graph types', () => {
    (0, vitest_1.it)('should return the given node type', () => {
        const g = new index_js_1.Graph();
        const props = g.nodes;
        (0, vitest_1.expectTypeOf)(props).toEqualTypeOf();
    });
    (0, vitest_1.it)('should return the given edge properties type', () => {
        const g = new index_js_1.Graph();
        const props = g.getEdgeProperties('a', 'b');
        (0, vitest_1.expectTypeOf)(props).toEqualTypeOf();
    });
    (0, vitest_1.it)('should only accept nodes of the given type', () => {
        const g = new index_js_1.Graph();
        g.addNode({ id: 'a', label: 'test' });
        // @ts-expect-error Wrong node type
        g.addNode('a');
    });
    (0, vitest_1.it)('should only accept properties of the given type', () => {
        const g = new index_js_1.Graph();
        g.setEdgeProperties('a', 'b', { type: 'bar' });
        // @ts-expect-error Wrong properties type
        g.setEdgeProperties('a', 'b', { type: 'nope' });
    });
    (0, vitest_1.it)('should require edge properties if LinkProps is defined', () => {
        const g = new index_js_1.Graph();
        g.addEdge('a', 'b', { props: { type: 'foo' } });
        g.addEdge('a', 'b', { weight: 1, props: { type: 'foo' } });
        // @ts-expect-error
        g.addEdge('a', 'b', 1);
        // @ts-expect-error
        g.addEdge('a', 'b', { weight: 1 });
    });
    (0, vitest_1.it)('should not allow edge properties if LinkProps is never', () => {
        const g = new index_js_1.Graph();
        g.addEdge('a', 'b');
        g.addEdge('a', 'b', 1);
        // @ts-expect-error Graph<string, never> does not allow edge properties
        g.addEdge('a', 'b', 1, 'notAllowed');
    });
});
