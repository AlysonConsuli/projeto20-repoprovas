import { TestInsertData } from "../interfaces/createData.js";
import * as appRepository from "../repositories/appRepository.js";
import { validateHasData } from "../utils/validateData.js";

export const addTest = async (test: TestInsertData) => {
  await validateHasData(test.categoryId, "categories", "Category");
  await validateHasData(test.teacherId, "teachers", "Teacher");
  await validateHasData(test.disciplineId, "disciplines", "Discipline");
  await appRepository.insertData(test, "tests");
};
