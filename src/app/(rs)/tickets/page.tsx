import CustomerSearch from '@/components/search-form';
import { getOpenTickets } from '@/lib/query/get-open-ticket';
import { getTicketsSearch } from '@/lib/query/get-ticket-search';
import TicketTable from './ticket-table';

export const metadata = {
  title: 'Tickets',
};

async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;
  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <CustomerSearch action="/tickets" />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">No Tickets Found</h1>
            <p className="text-gray-500">Please try a different search.</p>
          </div>
        )}
      </>
    );
  }
  const result = await getTicketsSearch(searchText);

  return (
    <>
      <CustomerSearch action="/tickets" />
      {result.length ? (
        <TicketTable data={result} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">No Tickets Found</h1>
          <p className="text-gray-500">Please try a different search.</p>
        </div>
      )}
    </>
  );
}

export default Tickets;
