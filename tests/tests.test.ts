import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/config/db.js";
import * as userFactory from "./factories/userFactory.js";
import * as testFactory from "./factories/testFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE blacklist CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`;
});

describe("Tests tests suite", () => {
  it("given name, pdfUrl, categoryId, teacherDisciplineId, create test", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);
    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;

    const testBody = testFactory.testBody();
    const { name, pdfUrl, categoryId, teacherDisciplineId } = testBody;
    response = await supertest(app)
      .post(`/test`)
      .send(testBody)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);

    const test = await prisma.tests.findFirst({
      where: { name, pdfUrl, categoryId, teacherDisciplineId },
    });
    expect(name).toBe(test.name);
  });

  it("get tests", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);
    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;

    const testBody = testFactory.testBody();
    const test = await testFactory.createTest(testBody);

    response = await supertest(app)
      .get(`/tests`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).not.toBeNull();
  });

  it("given groupBy=disciplines receive test order by disciplines", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);
    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;

    const testBody = testFactory.testBody();
    const test = await testFactory.createTest(testBody);

    response = await supertest(app)
      .get(`/tests?groupBy=disciplines`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).not.toBeNull();
  });

  it("given groupBy=teachers receive test order by teachers", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);
    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;

    const testBody = testFactory.testBody();
    const test = await testFactory.createTest(testBody);

    response = await supertest(app)
      .get(`/tests?groupBy=teachers`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).not.toBeNull();
  });

  it("given categoryId not registered, receive 404", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);
    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;

    const testBody = testFactory.testBody();
    response = await supertest(app)
      .post(`/test`)
      .send({ ...testBody, categoryId: 1000 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  it("given teacherDisciplineId not registered, receive 404", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);
    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;

    const testBody = testFactory.testBody();
    response = await supertest(app)
      .post(`/test`)
      .send({ ...testBody, teacherDisciplineId: 1000 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  it("given invalid token, receive 401", async () => {
    const invalidToken = "invalid token";

    const testBody = testFactory.testBody();
    let response = await supertest(app)
      .post(`/test`)
      .send(testBody)
      .set("Authorization", `Bearer ${invalidToken}`);
    expect(response.status).toBe(401);

    response = await supertest(app)
      .get(`/tests`)
      .set("Authorization", `Bearer ${invalidToken}`);
    expect(response.status).toBe(401);
  });

  it("do not send token, receive 401", async () => {
    const testBody = testFactory.testBody();
    let response = await supertest(app).post(`/test`).send(testBody);
    expect(response.status).toBe(401);

    response = await supertest(app).get(`/tests`);
    expect(response.status).toBe(401);
  });

  it("given invalid data, receive 422", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);
    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.body.token;

    const invalidTest = testFactory.invalidTest();
    response = await supertest(app)
      .post("/test")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidTest);
    expect(response.status).toBe(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
