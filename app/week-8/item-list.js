"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  const handleSort = (criteria) => setSortBy(criteria);

  let sortedItems = [...items];

  if (sortBy === "name") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    sortedItems.sort((a, b) => a.category.localeCompare(b.category));
  }

  const groupItemsByCategory = (itemsArray) => {
    return itemsArray.reduce((groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6 items-center justify-center">
        <button
          onClick={() => handleSort("name")}
          className={`px-4 py-2 rounded ${
            sortBy === "name" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => handleSort("category")}
          className={`px-4 py-2 rounded ${
            sortBy === "category" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => handleSort("grouped")}
          className={`px-4 py-2 rounded ${
            sortBy === "grouped" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Group by Category
        </button>
      </div>

      {sortBy === "grouped" ? (
        <div>
          {Object.entries(groupItemsByCategory(sortedItems))
            .sort(([catA], [catB]) => catA.localeCompare(catB))
            .map(([category, groupedItems]) => (
              <div key={category} className="mb-4">
                <h2 className="text-xl font-bold capitalize mb-2">
                  {category}
                </h2>
                <ul>
                  {groupedItems
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                      <Item
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                        onSelect={onItemSelect}
                      />
                    ))}
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={onItemSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
