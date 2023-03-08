"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToBuffer = exports.bufferToObject = void 0;
/**
 * convert Buffer -> Object
 * @date 2023-02-12
 * @param {Buffer} buffer
 * @returns {Object | Buffer}
 */
const bufferToObject = (buffer) => {
    try {
        return JSON.parse(buffer.toString());
    }
    catch {
        return buffer;
    }
};
exports.bufferToObject = bufferToObject;
/**
 * convert Object -> Buffer
 * @date 2023-02-12
 * @param {Object} object
 * @returns {Buffer}
 */
const objectToBuffer = (object) => {
    try {
        if (Buffer.isBuffer(object))
            return object;
        return Buffer.from(JSON.stringify(object));
    }
    catch {
        return Buffer.from("");
    }
};
exports.objectToBuffer = objectToBuffer;
