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

  it("given valid email and password, receive token", async () => {
    const login = userFactory.createLogin();
    const user: any = await userFactory.createUser(login);

    const response = await supertest(app).post(`/sign-in`).send({
      email: user.email,
      password: user.plainPassword,
    });
    const token = response.body.token;
    expect(token).not.toBeNull();
  });

  it("given email and password already in use, receive 409", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);

    const response = await supertest(app).post(`/sign-up`).send(login);
    expect(response.status).toBe(409);
  });

  it("given wrong password, receive 401", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);

    const response = await supertest(app)
      .post(`/sign-in`)
      .send({ ...login, password: "wrong password" });
    expect(response.status).toBe(401);
  });

  it("given email not registered, receive 404", async () => {
    const login = userFactory.createLogin();

    const response = await supertest(app).post(`/sign-in`).send(login);
    expect(response.status).toBe(404);
  });

  it("given invalid data, receive 422", async () => {
    const invalidLogin = userFactory.invalidLogin();
    let response = await supertest(app).post(`/sign-in`).send(invalidLogin);
    expect(response.status).toBe(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
