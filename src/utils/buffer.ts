/**
 * convert Buffer -> Object
 * @date 2023-02-12
 * @param {Buffer} buffer
 * @returns {Object | Buffer}
 */
export const bufferToObject = (buffer: Buffer): Object | Buffer => {
  try {
    return JSON.parse(buffer.toString());
  } catch {
    return buffer;
  }
};

/**
 * convert Object -> Buffer
 * @date 2023-02-12
 * @param {Object} object
 * @returns {Buffer}
 */
export const objectToBuffer = (object: Object): Buffer => {
  if (Buffer.isBuffer(object)) return object;
  return Buffer.from(JSON.stringify(object));
};
