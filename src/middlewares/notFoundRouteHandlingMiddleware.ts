import { Request, Response, NextFunction } from "express";

export const notFoundRouteHandlingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send("Route not found");
};
