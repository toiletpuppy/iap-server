import { RequestDetail, ResponseDetail } from "anyproxy";
import fs from "fs";
import find from "lodash/find";
import path from "path";
import { Module } from "../types";
import { bufferToObject, objectToBuffer } from "../utils";

const files = fs.readdirSync(__dirname);
const modules: Module[] = [];

// load all modules from this folder
files.forEach(async (file) => {
  const moduleName = path.parse(file).name;
  if (moduleName !== "index") {
    const module: { [key: string]: Module } = await import(`./${moduleName}`);

    modules.push(...Object.values(module));
    console.log("\x1b[32m%s\x1b[0m", `[Module loaded]: ${moduleName}`);
  }
});

// process the response
export const beforeSendResponse = (
  requestDetail: RequestDetail,
  responseDetail: ResponseDetail
) => {
  const response = responseDetail.response;
  const match = find(modules, (module: Module) =>
    RegExp(module.url).test(requestDetail.url)
  );

  if (match) {
    response.body = objectToBuffer(
      match.rewrite(bufferToObject(response.body), requestDetail)
    );
  }

  return { response };
};
