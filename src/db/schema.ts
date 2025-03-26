import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
} from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  email: varchar('email').unique().notNull(),
  phone: varchar('phone').unique().notNull(),
  address1: varchar('address1').notNull(),
  address2: varchar('address2'),
  city: varchar('city').notNull(),
  state: varchar('state').notNull(),
  zip: varchar('zip').notNull(),
  country: varchar('country'),
  notes: text('notes'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').notNull().references(() => customers.id),
  title: varchar('title').notNull(),
  description: text('description'),
  completed: boolean('completed').notNull().default(false),
  tech: varchar('tech').notNull().default('unassigned'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const customerRelations = relations(customers, (
  ({ many }: { many: any }) => ({ tickets: many(tickets) })
));

export const ticketRelations = relations(tickets, (
  ({ one }: { one: any }) => ({ customer: one(customers, { field: [tickets.customerId], references: customers.id }) })
));