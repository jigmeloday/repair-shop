'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { InputWithLabel } from '@/components/inputs/input-with-label';
import { TextAreaWithLabel } from '@/components/inputs/text-area-with-label';
import { Button } from '@/components/ui/button';
import {
  InsertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from '@/zod-schema/ticket';
import { type selectCustomerSchemaType } from '@/zod-schema/customer';
import { CheckboxWithLabel } from '@/components/inputs/checkbox-with-label';
import { SelectWithLabel } from '@/components/inputs/select-with-label';

type Props = {
  ticket?: selectTicketSchemaType;
  customer?: selectCustomerSchemaType;
  isEditable?: boolean;
  tech?: {
    id: string;
    description: string;
  }[];
};

export default function TicketForm({
  ticket,
  customer,
  isEditable = true,
  tech,
}: Props) {
  const isManeger = Array.isArray(tech);
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
          {/* {ticket?.id && isEditable ? 'Edit' : 'New'} Ticket{' '}
          {ticket?.id ? `# ${ticket.id}` : 'Form'} */}
          {
            isEditable ? (
              ticket?.id && isEditable ? 'Edit Ticket' : 'New Ticket Form'
            ) : (
              ticket?.id ? 'View Ticket' : 'New Ticket Form'
            )
          }
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
              disabled={!isEditable}
            />
            {isManeger ? (
              <SelectWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                data={[
                  {
                    id: 'new-ticket@example.com',
                    description: 'new-ticket@example.com',
                  },
                  ...tech,
                ]}
              />
            ) : (
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled
                readOnly={true}
              />
            )}
            {ticket?.id ? (
              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer?.firstName} {customer?.lastName}
              </p>
              <p>{customer?.address1}</p>
              {customer?.address2 ? <p>{customer?.address2}</p> : null}
              <p>
                {customer?.city}, {customer?.state} {customer?.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer?.email}</p>
              <p>Phone: {customer?.phone}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<insertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
              disabled={!isEditable}
            />
            {isEditable ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4"
                  variant="default"
                  title="Save"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  title="Reset"
                  onClick={() => {
                    form.reset(defaultValues);
                  }}
                >
                  Reset
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}
