import { Body } from "../types";

export default {
  pattern: /^https:\/\/graph.nhaccuatui.com\/.*\/users\/info*/,
  rewrite: (body: Body) => {
    body.data.vipExpire = "09.09.2099";
    body.data.isVIP = true;

    return body;
  },
};
