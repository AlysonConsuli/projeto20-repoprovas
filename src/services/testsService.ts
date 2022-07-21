import { notFoundError } from "../middlewares/errorHandlingMiddleware.js";
import { TestInsertData } from "../interfaces/createData.js";
import * as testsRepository from "../repositories/testsRepository.js";

export const addTest = async (test: TestInsertData) => {
  const category = await testsRepository.findCategoryById(test.categoryId);
  if (!category) {
    throw notFoundError("Category not found!");
  }
  const teacherDiscipline = await testsRepository.findTeacherDisciplineById(
    test.teacherDisciplineId
  );
  if (!teacherDiscipline) {
    throw notFoundError("TeacherDiscipline not found!");
  }
  await testsRepository.insertTest(test);
};
