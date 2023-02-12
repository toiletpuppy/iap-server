import { Body } from "../types";

export default {
  pattern: /^https:\/\/httpbin.org\/user-agent$/,
  rewrite: (body: Body) => {
    body = { ...body, test: "rewrite test" };
    return body;
  },
};
