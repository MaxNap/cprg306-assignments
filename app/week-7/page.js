"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import Link from "next/link";

export default function Page() {
  const [items, setItems] = useState([...itemsData]);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
      <Link
        href="../"
        className="text-3xl font-bold text-center block mx-auto mt-6"
      >
        Back to Home Page
      </Link>
    </main>
  );
}
