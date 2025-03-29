"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasCycle = hasCycle;
const index_js_1 = require("../algorithms/depthFirstSearch/index.js");
const CycleError_js_1 = require("../CycleError.js");
/**
 * Perform a depth first search to detect an eventual cycle.
 *
 * You can provide a `shouldFollow` function to constrain the traversing and
 * provide `sourceNodes` to explore a particular sub-graphs.
 */
function hasCycle(graph, opts) {
    try {
        (0, index_js_1.depthFirstSearch)(graph, Object.assign(Object.assign({}, opts), { includeSourceNodes: true, errorOnCycle: true }));
        // No error thrown -> no cycles
        return false;
    }
    catch (error) {
        if (error instanceof CycleError_js_1.CycleError) {
            return true;
        }
        else {
            throw error;
        }
    }
}
