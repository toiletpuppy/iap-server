import { Body } from "../types";

export default {
  pattern: /^https:\/\/api\.textnow\.me\/api2.0\/users\/.+/,
  rewrite: (body: Body) => {
    body["show_ads"] = false;
    body["premium_calling"] = true;
    return body;
  },
};
