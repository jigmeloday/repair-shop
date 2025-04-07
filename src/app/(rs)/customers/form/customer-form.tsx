'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  InsertCustomerSchema,
  type insertCustomerSchemaType,
  SelectCustomerSchema,
  type selectCustomerSchemaType,
} from '@/zod-schema/customer';

type Props = {
  customer?: selectCustomerSchemaType;
};

export default function CustomerForm({ customer }: Props) {
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id,
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    email: customer?.email || '',
    address1: customer?.address1 || '',
    address2: customer?.address2 || '',
    city: customer?.city || '',
    state: customer?.state || '',
    zip: customer?.zip || '',
    phone: customer?.phone || '',
    createdAt: customer?.createdAt || new Date(),
    updatedAt: customer?.updatedAt || new Date(),
    notes: customer?.notes || '',
  };

  const form = useForm<insertCustomerSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(InsertCustomerSchema),
    defaultValues,
  });
  const onSubmit = async (data: insertCustomerSchemaType) => {
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
