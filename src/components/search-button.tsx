'use client';
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button';
import { LoaderCircle } from 'lucide-react';

function SearchButton() {
  const status = useFormStatus();
  return (
    <Button type="submit" disabled={status.pending} className="w-20">
      {
        status.pending ? (
          <LoaderCircle className="animate-spin" size={16} />
        ) : 
        (
          <span>Search</span>
        )
      }
    </Button>

  )
}

export default SearchButton;
