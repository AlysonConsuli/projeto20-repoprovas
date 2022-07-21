import Joi from "joi";
import { TestInsertData } from "../interfaces/createData.js";

export const testSchema = Joi.object<TestInsertData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  categoryId: Joi.number().integer().positive().required(),
  teacherDisciplineId: Joi.number().integer().positive().required(),
});
