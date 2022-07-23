import prisma from "../config/db.js";

export const findTests = async () => {
  const tests = await prisma.tests.findMany({});
  return tests;
};

export const findTestsByDisciplines = async () => {
  const tests = await prisma.terms.findMany({
    include: {
      disciplines: {
        include: {
          tests: {
            include: {
              teacher: true,
            },
          },
        },
      },
    },
  });
  return tests;
};

export const findTestsByTeachers = async () => {
  const tests = await prisma.teachers.findMany({
    include: {
      tests: {
        include: {
          discipline: true,
        },
      },
    },
  });
  return tests;
};
