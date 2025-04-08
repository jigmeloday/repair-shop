import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { customers } from '@/db/schema';

export const InsertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, 'Firstname is required'),
  lastName: (schema) => schema.min(1, 'Lastname is required'),
  email: (schema) => schema.min(1, 'Email is required').email('Invalid email format'),
  address1: (schema) => schema.min(1, 'Address is required'),
  city: (schema) => schema.min(1, 'City is required'),
  state: (schema) => schema.length(2, 'State must be 2 characters'),
  zip: (schema) => schema.regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code'),
  phone: (schema) => schema.regex(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone code'),
 });

 export const SelectCustomerSchema = createSelectSchema(customers);
 export type insertCustomerSchemaType = typeof InsertCustomerSchema._type;
  export type selectCustomerSchemaType = typeof SelectCustomerSchema._type;