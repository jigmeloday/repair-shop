import { ReactNode } from 'react';

async function Template({ children }: { children: ReactNode }) {
  return (
    <div className="animate-appear">{children}</div>
  );
}

export default Template;
