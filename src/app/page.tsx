import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <h1>
            Kinley&apos;s Computer <br /> Repair shop{' '}
          </h1>
          <address>
            555 Gateway Lane <br />
            Kansas City, KS 55555
          </address>
          <p>Open Daily: 9am to 5pm</p>
          <Link href="tel:77455740" className="hover:underline" >
          5555
          </Link>
        </div>
      </main>
    </div>
  );
}
