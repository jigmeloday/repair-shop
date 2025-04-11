import SearchButton from '@/components/search-button';
import { Input } from '@/components/ui/input';
import Form from 'next/form';
function CustomerSearch({ action }: { action: string }) {
  return (
    <Form action={action} className="flex items-center gap-2">
      <Input
        name="searchText"
        type="text"
        placeholder="Search customers"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}

export default CustomerSearch;
