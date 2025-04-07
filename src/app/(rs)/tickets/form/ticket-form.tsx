'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  InsertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from '@/zod-schema/ticket';
import { type selectCustomerSchemaType } from '@/zod-schema/customer';
type Props = {
  ticket?: selectTicketSchemaType;
  customer?: selectCustomerSchemaType;
};

export default function TicketForm({ ticket, customer }: Props) {
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? '(NEW)',
    customerId: ticket?.customerId ?? (customer?.id as number),
    title: ticket?.title ?? '',
    description: ticket?.description ?? '',
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? 'new-ticket@example.com',
  };

  const form = useForm<insertTicketSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(InsertTicketSchema),
    defaultValues,
  });
  const onSubmit = async (data: insertTicketSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? 'Edit' : 'New'} Ticket{' '}
          {ticket?.id ? `# ${ticket.id}` : 'Form'}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        >
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  );
}
