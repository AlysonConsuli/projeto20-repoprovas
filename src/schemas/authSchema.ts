import Joi from "joi";
import { UserInsertData } from "../services/authService.js";

interface PasswordConfirmation {
  passwordConfirmation: string;
}
type SignupInsertData = UserInsertData & PasswordConfirmation;

export const signupSchema = Joi.object<SignupInsertData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.ref("password"),
});

export const signinSchema = Joi.object<UserInsertData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
