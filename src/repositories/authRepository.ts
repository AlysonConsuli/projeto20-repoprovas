import prisma from "../config/db.js";

import { TokenInsertData, UserInsertData } from "../interfaces/createData.js";

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

export const findTokenOnBlacklist = async (token: string) => {
  const blacklistToken = await prisma.blacklist.findFirst({
    where: {
      token,
    },
  });
  return blacklistToken;
};

export const insertTokenToBlacklist = async (tokenData: TokenInsertData) => {
  await prisma.blacklist.create({
    data: tokenData,
  });
};
