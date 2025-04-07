'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  InsertTicketSchema,
  type insertTicketSchemaType,
  SelectTicketSchema,
  type selectTicketSchemaType,
} from '@/zod-schema/ticket';

type Props = {
  ticket?: selectTicketSchemaType;
};

export default function TicketForm({ ticket }: Props) {
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(NEW)",
    customerId: ticket?.customerId || customer.id,
    title: ticket?.title || '',
    description: ticket?.description || '',
    tech: ticket?.tech || '',
    notes: ticket?.notes || ''
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
          {customer?.id ? 'Edit' : 'Add New Customer'} Customer Form
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
