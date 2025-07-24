"use client";

import { getItems, addItem } from "../_services/shopping-list-service";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

export default function ShoppingListPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const loadItems = async () => {
    if (user) {
      const userItems = await getItems(user.uid);
      setItems(userItems);
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  const handleAddItem = async (newItem) => {
    if (!user) return;

    const id = await addItem(user.uid, newItem);
    const itemWithId = { id, ...newItem };
    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  const handleItemSelect = (item) => {
    if (!item?.name) return;

    const cleanedName = item.name
      .split(",")[0]
      .replace(/[^\p{L}\s]/gu, "")
      .trim();

    setSelectedItemName(cleanedName);
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      window.location.href = "/week-10";
    } catch (error) {
      console.log("Sign-out error:", error);
    }
  };

  return (
    <main>
      <header>
        <h1 className="text-3xl font-bold text-center my-6">Shopping List</h1>
      </header>

      {user ? (
        <section className="p-6 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showProfile ? "Hide Profile" : "Show Profile Info"}
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>

          {showProfile && (
            <div className="mb-6 p-4 bg-gray-100 rounded text-center shadow">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-2"
              />
              <p className="text-xl font-semibold">{user.displayName}</p>
              <p className="text-gray-700">{user.email}</p>
            </div>
          )}

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
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h2 className="text-2xl">Access Denied</h2>
          <p className="text-gray-600">
            You must be signed in to view this page.
          </p>
          <Link
            href="/week-9/"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Sign In Page
          </Link>
        </section>
      )}
    </main>
  );
}
