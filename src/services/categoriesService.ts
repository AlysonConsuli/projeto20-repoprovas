import * as categoriesRepository from "../repositories/categoriesRepository.js";

export const getCategories = async () => {
  const categories = await categoriesRepository.findCategories();
  return categories;
};
