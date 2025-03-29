import { Graph, shortestPath, NextWeightFnParams } from '../graph-data-structure';
import unitDefs from '../data/unitDefs.json';

const cachedDefs = new Map();

function createGraph(unitType) {
    const graph = new Graph();
    for (const [unit, def] of Object.entries(unitDefs[unitType])) {
        graph.addEdge(unit, def.convertTo, def.factor);
        graph.addEdge(def.convertTo, unit, 1 / def.factor);
    }
    return graph;
}

function multiplyWeightFunction(wp) {
    if (wp.currentPathWeight === undefined) {
        return wp.edgeWeight;
    }
    return wp.edgeWeight * wp.currentPathWeight;
}

function getUnitList(unitType) {
    const graph = createGraph(unitType);
    return graph.nodes;
}

function createConversionFor(unitType, unit) {
    const graph = createGraph(unitType);
    const cacheName = unitType + "_" + unit;
    if (cachedDefs.has(cacheName)) {
        // console.log("Returning cached conversion for: ", cacheName);
        return cachedDefs.get(cacheName);
    }
    const conversions = new Map();
    for (const node of graph.nodes) {
        if (node !== unit) {
            try {
                const result = shortestPath(graph, unit, node, multiplyWeightFunction);
                if (result.weight === undefined) {
                    continue;
                }
                conversions.set(node, result.weight);
            } catch (e) {
                console.log("No path found for: ", node);
            }
        }
    }
    cachedDefs.set(cacheName, conversions);
    return conversions;
}

export {
    getUnitList,
    createConversionFor
};
