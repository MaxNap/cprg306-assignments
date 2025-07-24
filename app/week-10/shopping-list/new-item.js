"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleNameChange = (event) => setName(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: generateId(),
      name,
      quantity,
      category,
    };

    onAddItem(newItem);

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-100 p-6 rounded-lg shadow-md max-w-md mx-auto space-y-6 mb-10"
    >
      <h2 className="text-2xl font-bold text-center">Add New Item</h2>

      <div>
        <label className="block text-lg font-medium mb-1">Item Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          required
          placeholder="Item Name"
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-lg font-medium mb-1">
          Quantity: {quantity}
        </label>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity === 1}
            className="px-8 py-4 text-2xl font-bold rounded bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300"
          >
            -
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={quantity === 20}
            className="px-8 py-4 text-2xl font-bold rounded bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium mb-1">Category:</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded hover:bg-blue-700"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
