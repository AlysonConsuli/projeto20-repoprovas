import Joi from "joi";
import { UserInsertData } from "../services/authService.js";

export const authSchema = Joi.object<UserInsertData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
