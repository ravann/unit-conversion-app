"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
const invariant_js_1 = require("./invariant.js");
class Graph {
    constructor() {
        /**
         * Contains all the nodes added to the graph.
         */
        this.nodes = new Set();
        /**
         * The adjacency list of the graph.
         */
        this.edges = new Map();
        /**
         * The weights of edges.
         *
         * Map<SourceNode, Map<TargetNode, EdgeWeight>>
         */
        this.edgeWeights = new Map();
        /**
         * Arbitrary properties of edges.
         * Map<SourceNode, Map<TargetNode, EdgeProperties>>
         */
        this.edgeProperties = new Map();
    }
    /**
     * Adds a node to the graph.
     * If node was already added, this function does nothing.
     * If node was not already added, this function sets up an empty adjacency list.
     */
    addNode(node) {
        if (!this.nodes.has(node)) {
            this.nodes.add(node);
        }
        if (!this.edges.has(node)) {
            this.edges.set(node, new Set());
        }
        return this;
    }
    /**
     * Removes a node from the graph.
     * Also removes incoming and outgoing edges.
     */
    removeNode(node) {
        // Remove outgoing edges (and signal that the node no longer exists).
        this.edges.delete(node);
        this.nodes.delete(node);
        // Remove ingoing edges
        for (const adjacentNodes of this.edges.values()) {
            adjacentNodes.delete(node);
        }
        return this;
    }
    /**
     * Gets the adjacent nodes set for the given node.
     */
    adjacent(node) {
        return this.edges.get(node);
    }
    /**
     * Sets the weight of the given edge.
     */
    setEdgeWeight(source, target, weight) {
        if (!this.edgeWeights.has(source)) {
            this.edgeWeights.set(source, new Map());
        }
        const weights = this.edgeWeights.get(source);
        (0, invariant_js_1.invariant)(weights);
        weights.set(target, weight);
        return this;
    }
    /**
     * Gets the weight of the given edge or `1` if not set.
     */
    getEdgeWeight(source, target) {
        var _a, _b;
        return (_b = (_a = this.edgeWeights.get(source)) === null || _a === void 0 ? void 0 : _a.get(target)) !== null && _b !== void 0 ? _b : 1;
    }
    /**
     * Set the properties of the given edge.
     */
    setEdgeProperties(source, target, props) {
        if (!this.edgeProperties.has(source)) {
            this.edgeProperties.set(source, new Map());
        }
        const propsHolder = this.edgeProperties.get(source);
        (0, invariant_js_1.invariant)(propsHolder);
        propsHolder.set(target, props);
        return this;
    }
    /**
     * Get the properties of the given edge or undefined if the edge doesn't exist .
     */
    getEdgeProperties(source, target) {
        var _a;
        return (_a = this.edgeProperties.get(source)) === null || _a === void 0 ? void 0 : _a.get(target);
    }
    /**
     * Adds an edge from the `source` node to `target` node.
     * This method will create the nodes if they were not already added.
     */
    addEdge(source, target, ...args) {
        let weight;
        let linkProps;
        const firstArg = args[0];
        if (typeof firstArg === 'number') {
            weight = firstArg;
        }
        if (typeof firstArg === 'object') {
            weight = firstArg.weight;
            if (firstArg)
                linkProps = Object.prototype.hasOwnProperty.call(firstArg, 'props')
                    ? firstArg.props
                    : undefined;
        }
        this.addNode(source);
        this.addNode(target);
        const adjacentNodes = this.adjacent(source);
        (0, invariant_js_1.invariant)(adjacentNodes);
        adjacentNodes.add(target);
        if (weight !== undefined) {
            this.setEdgeWeight(source, target, weight);
        }
        if (linkProps !== undefined) {
            this.setEdgeProperties(source, target, linkProps);
        }
        return this;
    }
    /**
     * Removes the edge from the `source` node to `target` node.
     * Does not remove the nodes themselves.
     * Does nothing if the edge does not exist.
     */
    removeEdge(source, target) {
        var _a, _b;
        (_a = this.edges.get(source)) === null || _a === void 0 ? void 0 : _a.delete(target);
        (_b = this.edgeProperties.get(source)) === null || _b === void 0 ? void 0 : _b.delete(target);
        return this;
    }
    /**
     * Returns true if there is an edge from the `source` node to `target` node..
     */
    hasEdge(source, target) {
        var _a, _b;
        return (_b = (_a = this.edges.get(source)) === null || _a === void 0 ? void 0 : _a.has(target)) !== null && _b !== void 0 ? _b : false;
    }
}
exports.Graph = Graph;
