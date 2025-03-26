import BackButton from '@/components/ui/back-button';
import { getCustomer } from '@/lib/query/get-customer';

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
      console.log(customer);
    } else {
      return <div>Customer not found</div>;
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
