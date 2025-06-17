import Link from "next/link";
import ItemList from "./item-list";


export default function Page() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping List</h1>
      <ItemList />
      <Link href="../" className="text-3xl font-bold text-center block mx-auto mt-6">Back to Home Page</Link>
    </main>
  );
}