import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { tickets } from '@/db/schema';
import { z } from 'zod';

export const InsertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("(NEW)")]).optional(),
  title: (schema) => schema.min(1, 'Title is required'),
  description: (schema) => schema.min(1, 'Description is required'),
  tech: (schema) => schema.email('Invalid email format'),
 });

 export const SelectTicketSchema = createSelectSchema(tickets);
 export type insertTicketSchemaType = typeof InsertTicketSchema._type;
  export type selectTicketSchemaType = typeof SelectTicketSchema._type;