"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSerialized = checkSerialized;
exports.comesBefore = comesBefore;
const vitest_1 = require("vitest");
function checkSerialized(graph) {
    var _a, _b, _c, _d;
    (0, vitest_1.expect)(graph.nodes.length).toEqual(3);
    (0, vitest_1.expect)(graph.links.length).toEqual(2);
    (0, vitest_1.expect)(graph.nodes[0]).toEqual('a');
    (0, vitest_1.expect)(graph.nodes[1]).toEqual('b');
    (0, vitest_1.expect)(graph.nodes[2]).toEqual('c');
    (0, vitest_1.expect)((_a = graph.links[0]) === null || _a === void 0 ? void 0 : _a.source).toEqual('a');
    (0, vitest_1.expect)((_b = graph.links[0]) === null || _b === void 0 ? void 0 : _b.target).toEqual('b');
    (0, vitest_1.expect)((_c = graph.links[1]) === null || _c === void 0 ? void 0 : _c.source).toEqual('b');
    (0, vitest_1.expect)((_d = graph.links[1]) === null || _d === void 0 ? void 0 : _d.target).toEqual('c');
}
function comesBefore(arr, a, b) {
    let aIndex = 0, bIndex = 0;
    arr.forEach(function (d, i) {
        if (d === a) {
            aIndex = i;
        }
        if (d === b) {
            bIndex = i;
        }
    });
    return aIndex < bIndex;
}
