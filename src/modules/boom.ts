import { verifyReceipt } from "../shared/verifyReceipt";

export default {
  pattern: /^https:\/\/apimboom2.globaldelight.net\/itunesreceipt_v2.php$/,
  rewrite: verifyReceipt,
};
