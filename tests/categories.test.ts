import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/config/db.js";
import * as userFactory from "./factories/userFactory.js";
import * as categoryFactory from "./factories/categoryFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE blacklist CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE categories CASCADE`;
});

describe("Categories tests suite", () => {
  it("get all categories", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);
    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;

    const categoryBody = categoryFactory.categoryBody();
    const category = await categoryFactory.createCategory(categoryBody);

    response = await supertest(app)
      .get(`/categories`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).not.toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
