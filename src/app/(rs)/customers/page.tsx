import CustomerSearch from '@/components/search-form';
import { getCustomerSearch } from '@/lib/query/get-customer-serch';
import CustomerTable from './customer-table';

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
      <CustomerTable data={result} />
    </>
  );
}

export default Customers;
