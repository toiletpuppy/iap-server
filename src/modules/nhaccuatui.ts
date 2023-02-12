import { Body, Request } from "../types";

export default {
  pattern: /^https:\/\/graph.nhaccuatui.com\/.*\/users\/info*/,
  rewrite: (body: Body, request: Request) => {
    if (request.url.includes("users/info")) {
      body.data.vipExpire = "09.09.2099";
      body.data.isVIP = true;
    }
    return body;
  },
};
