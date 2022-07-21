import { Request, Response } from "express";

import * as testsService from "../services/testsService.js";
import { TestInsertData } from "../interfaces/createData.js";

export const addTest = async (req: Request, res: Response) => {
  const test: TestInsertData = req.body;
  await testsService.addTest(test);
  res.sendStatus(201);
};
