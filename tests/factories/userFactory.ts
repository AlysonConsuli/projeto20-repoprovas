import { faker } from "@faker-js/faker";
import prisma from "../../src/config/db.js";

export const createLogin = (email = "test@test.com", passwordLength = 10) => {
  return {
    email,
    password: faker.internet.password(passwordLength),
  };
};
