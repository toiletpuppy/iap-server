import { Body } from "../types";

export default {
  pattern: /^https:\/\/graph.nhaccuatui.com\/.*\/user\/account\/info/,
  rewrite: (body: Body) => {
    body.data.vipExpire = "05.11.2099";
    body.data.isVIP = true;

    return body;
  },
};
