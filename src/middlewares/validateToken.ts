import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "../config/setup.js";
import { Users } from "@prisma/client";

import { unauthorizedError } from "./errorHandlingMiddleware.js";
import { findTokenOnBlacklist } from "../repositories/authRepository.js";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) {
    throw unauthorizedError(
      "You must pass an authorization token in the request header!"
    );
  }
  const hasBearer = authorization?.match(/Bearer/);
  if (!hasBearer) {
    throw unauthorizedError(
      "Authorization header must have 'Bearer' at the beggining!"
    );
  }
  const blacklistToken = await findTokenOnBlacklist(token);
  if (blacklistToken) {
    throw unauthorizedError("Token is no longer valid! Login again");
  }
  const secretKey = process.env.JWT_SECRET_KEY;
  try {
    const data: Users = jwt.verify(token, secretKey);
    res.locals.user = data;
    res.locals.token = token;
  } catch {
    throw unauthorizedError("Invalid token!");
  }
  next();
};
