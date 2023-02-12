import { verifyReceipt } from "../shared/verifyReceipt";
import { Body } from "../types";

export default {
  pattern: /^https:\/\/apimboom2.globaldelight.net\/itunesreceipt_v2.php$/,
  rewrite: (body: Body) => verifyReceipt(body),
};
