import {
  Blacklist,
  Categories,
  Disciplines,
  Teachers,
  TeachersDisciplines,
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
export type TeacherDisciplineInsertData = Omit<
  TeachersDisciplines,
  "id" | "createdAt"
>;
interface PasswordConfirmation {
  passwordConfirmation: string;
}
export type SignupInsertData = UserInsertData & PasswordConfirmation;
