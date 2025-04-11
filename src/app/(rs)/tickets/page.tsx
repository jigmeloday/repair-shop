import CustomerSearch from '@/components/search-form';
import { getTicketsSearch } from '@/lib/query/get-ticket';

export const metadata = {
  title: 'Tickets',
};

async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;
  if (!searchText) return <CustomerSearch action="/tickets" />;
  const result = await getTicketsSearch(searchText);

  return (
    <>
      <CustomerSearch action="/tickets" />
      <p>{JSON.stringify(result)}</p>
    </>
  );
}

export default Tickets;
