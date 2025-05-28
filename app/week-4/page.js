import NewItem from './new-item';
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Week 4: Quantity Controller</h1>
      <NewItem />
      <Link href="../" className="text-3xl font-bold text-center block mx-auto mt-6">Back to Home Page</Link>
    </main>
  );
}