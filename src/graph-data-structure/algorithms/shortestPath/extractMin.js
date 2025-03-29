"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMin = extractMin;
/**
 * Remove the node with the minimum weight from the priority queue.
 *
 * Performs linear search.
 */
function extractMin(tracks) {
    let min = Infinity;
    let minNode;
    const { d, q } = tracks;
    q.forEach((node) => {
        var _a;
        const nodeWeight = (_a = d.get(node)) !== null && _a !== void 0 ? _a : Infinity;
        if (nodeWeight < min) {
            min = nodeWeight;
            minNode = node;
        }
    });
    if (minNode === undefined) {
        // If we reach here, there's a disconnected subgraph, and we're done.
        q.clear();
        return null;
    }
    q.delete(minNode);
    return minNode;
}
