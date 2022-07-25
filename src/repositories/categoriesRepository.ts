import prisma from "../config/db.js";

export const findCategories = async () => {
  const tests = await prisma.categories.findMany({});
  return tests;
};
