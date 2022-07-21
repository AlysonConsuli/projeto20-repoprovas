import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../config/setup.js";

import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/errorHandlingMiddleware.js";
import * as authRepository from "../repositories/authRepository.js";
import { TokenInsertData, UserInsertData } from "../interfaces/createData.js";

export const signup = async (userData: UserInsertData) => {
  const { email, password } = userData;
  const user = await authRepository.findUserByEmail(email);
  if (user) {
    throw conflictError("User already exists!");
  }
  const hashedPassword: string = bcrypt.hashSync(password, 10);
  await authRepository.insertUser({ ...userData, password: hashedPassword });
};

export const signin = async (userData: UserInsertData) => {
  const { email, password } = userData;
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw notFoundError("User not found!");
  }
  if (!bcrypt.compareSync(password, user?.password)) {
    throw unauthorizedError("Incorrect password!");
  }
  const secretKey = process.env.JWT_SECRET_KEY;
  const token: string = jwt.sign(user, secretKey);
  return token;
};

export const logout = async (tokenData: TokenInsertData) => {
  await authRepository.insertTokenToBlacklist(tokenData);
};
