import { Body } from "../types";

export default {
  pattern: /^https:\/\/api\.(picsart|meiease)\.c(n|om)\/users\/show\/me.json/,
  rewrite: (body: Body) => ({
    ...body,
    subscription: {
      granted: true,
    },
  }),
};
