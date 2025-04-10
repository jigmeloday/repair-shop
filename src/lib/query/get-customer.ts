import { db } from '@/db';
import { customers } from '@/db/schema';
import {eq} from 'drizzle-orm';

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string | null;
  notes: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getCustomer(id: number): Promise< Customer | null> {
  const customer =  await db.select().from(customers).where(eq(customers.id, id));
  return customer[0]
}
