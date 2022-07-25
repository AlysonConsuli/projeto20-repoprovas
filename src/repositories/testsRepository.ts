import prisma from "../config/db.js";

export const findTests = async () => {
  const tests = await prisma.tests.findMany({});
  return tests;
};

export const findTestsByDisciplines = async () => {
  const tests = await prisma.terms.findMany({
    select: {
      disciplines: {
        select: {
          teachersDisciplines: {
            select: {
              tests: {
                select: {
                  category: {},
                },
              },
              teacher: true,
            },
          },
        },
      },
    },
  });
  return tests;
};

// export const findTestsByDisciplines = async () => {
//   const tests = await prisma.terms.findMany({
//     select: {
//       number: true,
//       disciplines: {
//         select: {
//           name: true,
//           tests: {
//             select: {
//               name: true,
//               pdfUrl: true,
//               category: {
//                 select: {
//                   name: true,
//                 },
//               },
//               teacher: {
//                 select: {
//                   name: true,
//                 },
//               },
//             },
//             orderBy: {
//               categoryId: "asc",
//             },
//           },
//         },
//       },
//     },
//   });
//   return tests;
// };

export const findTestsByTeachers = async () => {
  const tests = await prisma.teachers.findMany({});
  return tests;
};

// export const findTestsByTeachers = async () => {
//   const tests = await prisma.teachers.findMany({
//     select: {
//       name: true,
//       tests: {
//         select: {
//           name: true,
//           pdfUrl: true,
//           category: {
//             select: {
//               name: true,
//             },
//           },
//           discipline: {
//             select: {
//               name: true,
//               termId: true,
//             },
//           },
//         },
//         orderBy: {
//           categoryId: "asc",
//         },
//       },
//     },
//   });
//   return tests;
// };
