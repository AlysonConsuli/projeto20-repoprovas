import { GroupBy, TestInsertData } from "../interfaces/createData.js";
import { validateHasData } from "../utils/validateData.js";
import * as appRepository from "../repositories/appRepository.js";
import * as testsRepository from "../repositories/testsRepository.js";

export const addTest = async (test: TestInsertData) => {
  await validateHasData(test.categoryId, "categories", "Category");
  await validateHasData(
    test.teacherDisciplineId,
    "teachersDisciplines",
    "TeacherDiscipline"
  );
  await appRepository.insertData(test, "tests");
};

export const getTests = async (groupBy: GroupBy) => {
  if (groupBy === "disciplines") {
    return await testsRepository.findTestsByDisciplines();
  }
  if (groupBy === "teachers") {
    return await testsRepository.findTestsByTeachers();
  }
  return await testsRepository.findTests();
};
