import prisma from "../config/db.js";

import { UserInsertData } from "../services/authService.js";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return user;
};

export const insertUser = async (userData: UserInsertData) => {
  await prisma.users.create({
    data: userData,
  });
};
