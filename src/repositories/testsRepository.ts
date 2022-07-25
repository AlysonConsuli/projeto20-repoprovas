import prisma from "../config/db.js";

export const findTests = async () => {
  const tests = await prisma.tests.findMany({});
  return tests;
};

export const findTestsByDisciplines = async () => {
  const tests = await prisma.terms.findMany({
    include: {
      disciplines: {
        select: {
          id: true,
          name: true,
          term: {},
          teacherDisciplines: {
            select: {
              id: true,
              discipline: {},
              teacher: {},
              tests: {
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  category: {},
                },
              },
            },
          },
        },
      },
    },
  });
  return tests;
};

export const findTestsByTeachers = async () => {
  const tests = await prisma.teachersDisciplines.findMany({
    select: {
      id: true,
      discipline: {},
      teacher: {},
      tests: { select: { id: true, name: true, pdfUrl: true, category: {} } },
    },
  });
  return tests;
};
