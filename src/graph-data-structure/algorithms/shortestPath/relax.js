"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relax = relax;
const invariant_js_1 = require("../../invariant.js");
function relax(graph, tracks, source, target) {
    const { d, p } = tracks;
    const edgeWeight = graph.getEdgeWeight(source, target);
    const distanceSource = d.get(source);
    const distanceTarget = d.get(target);
    (0, invariant_js_1.invariant)(distanceSource, 'Missing source distance');
    (0, invariant_js_1.invariant)(distanceTarget, 'Missing target distance');
    if (distanceTarget > distanceSource + edgeWeight) {
        d.set(target, distanceSource + edgeWeight);
        p.set(target, source);
    }
}
