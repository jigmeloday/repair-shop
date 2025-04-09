'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/inputs/input-with-label';
import { TextAreaWithLabel } from '@/components/inputs/text-area-with-label';
import { SelectWithLabel } from '@/components/inputs/select-with-label';
import { StatesArray } from '@/constants/state-array';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
  InsertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from '@/zod-schema/customer';
import { CheckboxWithLabel } from '@/components/inputs/checkbox-with-label';
import { useAction } from 'next-safe-action/hooks';
import { saveCustomerAction } from '@/app/actions/safe-customer-action';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import DisplayServerActionResult from '@/components/display-server-action-result';

type Props = {
  customer?: selectCustomerSchemaType;
};

export default function CustomerForm({ customer }: Props) {
  const { getPermission, isLoading } = useKindeBrowserClient();
  const isManager = !isLoading && getPermission('manager')?.isGranted;
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    email: customer?.email ?? '',
    address1: customer?.address1 ?? '',
    address2: customer?.address2 ?? '',
    city: customer?.city ?? '',
    state: customer?.state ?? '',
    zip: customer?.zip ?? '',
    phone: customer?.phone ?? '',
    createdAt: customer?.createdAt ?? new Date(),
    updatedAt: customer?.updatedAt ?? new Date(),
    notes: customer?.notes ?? '',
    active: customer?.active ?? true,
  };

  const form = useForm<insertCustomerSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(InsertCustomerSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      toast.success('Customer saved successfully 🎉');
    },
    onError({ error }) {
      debugger;
      toast.error('Save customer failed ❌');
    },
  });

  const onSubmit = async (data: insertCustomerSchemaType) => {
    debugger;
    executeSave(data);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResult result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? 'Edit' : 'Add New Customer'} Customer{' '}
          {customer?.id ? `#${customer.id}` : 'Form'}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />
            <SelectWithLabel
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />
            <TextAreaWithLabel<insertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />
            {isLoading ? (
              <p>Loading...</p>
            ) : isManager && customer?.id ? (
              <CheckboxWithLabel<insertCustomerSchemaType>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
              />
            ) : null}
            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
                disabled={!form.formState.isDirty || isSaving}
              >
                {isSaving ? <LoaderCircle className="animate-spin" /> : 'Save'}
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
