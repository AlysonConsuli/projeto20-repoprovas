import { Request, Response } from "express";

import * as testsService from "../services/testsService.js";
import { GroupBy, TestInsertData } from "../interfaces/createData.js";

export const addTest = async (req: Request, res: Response) => {
  const test: TestInsertData = req.body;
  await testsService.addTest(test);
  res.sendStatus(201);
};

export const getTests = async (req: Request, res: Response) => {
  const groupBy = req.query.groupBy as GroupBy;
  const tests = await testsService.getTests(groupBy);
  res.send(tests);
};
