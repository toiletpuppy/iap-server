export const bufferToObject = (buffer: Buffer) =>
  JSON.parse(Buffer.from(buffer).toString());

export const objectToBuffer = (object: Object) =>
  Buffer.from(JSON.stringify(object));
