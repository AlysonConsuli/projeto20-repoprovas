import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/config/db.js";
import * as userFactory from "./factories/userFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE blacklist CASCADE`;
});

describe("User tests suite", () => {
  it("given email and password, create user", async () => {
    const login = userFactory.createLogin();
    const response = await supertest(app).post(`/sign-up`).send(login);
    expect(response.status).toBe(201);

    const user = await prisma.users.findFirst({
      where: { email: login.email },
    });
    expect(user.email).toBe(login.email);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
