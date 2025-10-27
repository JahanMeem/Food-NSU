import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  age: integer("age").notNull(),
  height: integer("height").notNull(), // in cm
  weight: integer("weight").notNull(), // in kg
  gender: varchar("gender", { length: 20 }).notNull(),
  medicalCondition: text("medical_condition"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});