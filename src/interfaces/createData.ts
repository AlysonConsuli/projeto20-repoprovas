import {
  Blacklist,
  Categories,
  Disciplines,
  Teachers,
  Terms,
  Tests,
  Users,
} from "@prisma/client";

export type UserInsertData = Omit<Users, "id" | "createdAt">;
export type TokenInsertData = Omit<Blacklist, "id" | "createdAt">;
export type TermInsertData = Omit<Terms, "id" | "createdAt">;
export type CategoryInsertData = Omit<Categories, "id" | "createdAt">;
export type TestInsertData = Omit<Tests, "id" | "createdAt">;
export type TeacherInsertData = Omit<Teachers, "id" | "createdAt">;
export type DisciplineInsertData = Omit<Disciplines, "id" | "createdAt">;
interface PasswordConfirmation {
  passwordConfirmation: string;
}
export type SignupInsertData = UserInsertData & PasswordConfirmation;
export type AppInsertData =
  | TermInsertData
  | CategoryInsertData
  | TestInsertData
  | TeacherInsertData
  | DisciplineInsertData;
export type Table =
  | "terms"
  | "categories"
  | "tests"
  | "teachers"
  | "disciplines";
export type GroupBy = "teachers" | "disciplines";
