import * as crypto from "crypto";
const pub_key = "7620c866f7a8251c6aebeb639562c510";
const pri_key = "6270c7a7851c6755007a0296770f05917455afb5";
const ts = Date.now();
const h = crypto
  .createHash("md5")
  .update(ts + pri_key + pub_key)
  .digest("hex");

export interface ApiHash {
  ts: number;
  pub_key: string;
  pri_key: string;
  h: string;
}
const generateApiHash = (): ApiHash => {
  return { pub_key, pri_key, ts, h };
};

export default generateApiHash;
