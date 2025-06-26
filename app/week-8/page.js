"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import Link from "next/link";

export default function Page() {
  const [items, setItems] = useState([...itemsData]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    if (!item?.name) return;

    const cleanedName = item.name
      .split(",")[0]
      .replace(/[^\p{L}\s]/gu, "")
      .trim();

    setSelectedItemName(cleanedName);
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping List</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
      <Link
        href="../"
        className="text-3xl font-bold text-center block mx-auto mt-10"
      >
        Back to Home Page
      </Link>
    </main>
  );
}
