import Joi from "joi";
import { SignupInsertData, UserInsertData } from "../interfaces/createData.js";

export const signupSchema = Joi.object<SignupInsertData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.ref("password"),
});

export const signinSchema = Joi.object<UserInsertData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
