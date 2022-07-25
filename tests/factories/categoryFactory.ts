import prisma from "../../src/config/db.js";
import { CategoryInsertData } from "../../src/interfaces/createData.js";

export const categoryBody = (name = "Category Name") => {
  return {
    name,
  };
};

export const createCategory = async (categoryBody: CategoryInsertData) => {
  const { name } = categoryBody;
  const category = await prisma.categories.create({
    data: {
      name,
    },
  });

  return category;
};
