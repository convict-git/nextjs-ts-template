import Link from 'next/link';

export function Welcome() {
  return (
    <section>
      <h1>Welcome Priyanshu</h1>
      <p>
        Ready to build? Head to the <Link href="/start-building">start building</Link> page to get
        started.
      </p>
    </section>
  );
}
