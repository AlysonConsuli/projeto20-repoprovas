import { Request, Response, NextFunction } from "express";
import { unprocessableEntityError } from "./errorHandlingMiddleware.js";

export const validateSchema = (schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw unprocessableEntityError(
        error.details.map((error) => error.message)
      );
    }
    next();
  };
};
