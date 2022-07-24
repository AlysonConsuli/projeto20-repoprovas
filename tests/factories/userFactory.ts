import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import prisma from "../../src/config/db.js";
import { UserInsertData } from "../../src/interfaces/createData.js";

export const createLogin = (email = "test@test.com", passwordLength = 10) => {
  return {
    email,
    password: faker.internet.password(passwordLength),
  };
};

export const createUser = async (login: UserInsertData) => {
  const user = await prisma.users.create({
    data: {
      email: login.email,
      password: bcrypt.hashSync(login.password, 10),
    },
  });

  return { ...user, plainPassword: login.password };
};

export const invalidLogin = (
  email = +faker.random.numeric(10),
  password = +faker.random.numeric(10)
) => {
  return {
    email,
    password,
  };
};
