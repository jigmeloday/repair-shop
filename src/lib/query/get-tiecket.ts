import { db } from '@/db';
import { tickets } from '@/db/schema';
import {eq} from 'drizzle-orm';

type Ticket = {
  id: number;
  customerId: number;
  title: string;
  description: string | null;
  completed: boolean;
  tech: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getTicket(id: number): Promise<Ticket> {
  const ticket = await db.select().from(tickets).where(eq(tickets.id, id));
  return ticket[0];
}
