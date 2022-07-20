import Cryptr from "cryptr";
import "../config/setup.js";

const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);

export const encrypt = (string: string) => cryptr.encrypt(string);
export const decrypt = (string: string) => cryptr.decrypt(string);
