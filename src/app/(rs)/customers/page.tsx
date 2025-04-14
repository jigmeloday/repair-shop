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
      {
        result && result.length > 0 ? (
          <CustomerTable
            data={result}
            />
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">No Customers Found</h1>
            <p className="text-gray-500">Please try a different search.</p>
          </div>
        )
      }
    </>
  );
}

export default Customers;
