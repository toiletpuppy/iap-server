export const bufferToObject = (buffer: Buffer) =>
  Buffer.isBuffer(buffer) ? JSON.parse(Buffer.from(buffer).toString()) : buffer;

export const objectToBuffer = (object: Object) =>
  !Buffer.isBuffer(object) ? Buffer.from(JSON.stringify(object)) : object;
