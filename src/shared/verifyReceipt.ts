import { Body } from "../types";

/**
 * verifyReceipt
 * @date 2023-02-13
 * @param {Body} body
 * @returns {Body}
 */
export const verifyReceipt = (body: Body): Body => {
  body = JSON.stringify(body);
  const args = [
    '("expires_date"):"\\w{4}@("expires_date_pst"):"\\w{4}@("expires_date_ms"):"\\w+"@("is_trial_period"):"\\w+"',
    '$1:"2099@$1:"2099@$1:"4096019658000"@$1:"false"',
  ];

  const regs = args[0].split("@");
  const strs = args[1].split("@");

  for (let i = 0; i < regs.length; i++) {
    const reg = new RegExp(regs[i], "g");
    body = body.replace(reg, strs[i]);
  }

  return JSON.parse(body);
};
