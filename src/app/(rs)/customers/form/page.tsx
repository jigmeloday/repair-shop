import BackButton from '@/components/ui/back-button';
import { getCustomer } from '@/lib/query/get-customer';
import CustomerForm from './customer-form';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;
  if (!customerId) {
    return {title : "New Customer"}
  }
  return {
    title: `Edit Customer #${customerId}`,
  }
}


async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2>Customer ID #{customerId} not found</h2>
            <BackButton variant="ghost" title="Go back" />
          </>
        );
      }
      return <CustomerForm customer={customer} />;
    } else {
      return <CustomerForm />;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }

  return (
    <div>
      <h1>Customers</h1>
    </div>
  );
}

export default Page;
