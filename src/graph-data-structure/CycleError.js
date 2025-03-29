"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CycleError = void 0;
class CycleError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CycleError.prototype);
    }
}
exports.CycleError = CycleError;
