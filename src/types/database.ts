import { users } from "@/db/schema";

export type Database = {
  users: typeof users;
};
