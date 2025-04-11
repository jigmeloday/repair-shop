import CustomerSearch from '@/components/search-form';
import { getCustomerSearch } from '@/lib/query/get-customer-serch';

export const metadata = {
  title: 'Customer Search',
};

async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;
  if (!searchText) return <CustomerSearch action="/customers" />;
  const result = await getCustomerSearch(searchText);
  return (
    <>
      <CustomerSearch action="/customers" />
      <p>{JSON.stringify(result)}</p>
    </>
  );
}

export default Customers;
