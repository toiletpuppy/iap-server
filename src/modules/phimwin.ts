import { Body } from "../types";

export default {
  pattern: /^http:\/\/phimwin\.com\/b\/g$/,
  rewrite: (body: Body) => {
    body.data.title.useVipLink = true;
    body.data.title.canUseVpn = true
    return body;
  },
};
