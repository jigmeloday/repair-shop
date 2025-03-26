import { Button } from '@/components/ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

function Page() {
  return (
    <main className="h-dvh flex flex-col items-center justify-center gap-6 text-4xl p-4">
      <h1>Repair Shop</h1>
      <Button asChild>
        <LoginLink>Log In</LoginLink>
      </Button>
    </main>
  );
}

export default Page;
