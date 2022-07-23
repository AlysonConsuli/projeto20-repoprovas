import prisma from "../config/db.js";

export const findTests = async () => {
  const tests = await prisma.tests.findMany({});
  return tests;
};

export const findTestsByDisciplines = async () => {
  const tests = await prisma.tests.findMany({
    where: {},
  });
  return tests;
};

export const findTestsByTeachers = async () => {
  const tests = await prisma.tests.findMany({
    where: {},
  });
  return tests;
};
