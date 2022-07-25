import { Request, Response } from "express";

import * as categoriesServices from "../services/categoriesService.js";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await categoriesServices.getCategories();
  res.send({ categories });
};
