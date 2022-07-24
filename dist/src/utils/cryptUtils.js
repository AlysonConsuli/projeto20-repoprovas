import Cryptr from "cryptr";
import "../config/setup.js";
var cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
export var encrypt = function (string) { return cryptr.encrypt(string); };
export var decrypt = function (string) { return cryptr.decrypt(string); };
