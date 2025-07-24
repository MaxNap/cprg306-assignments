"use client";

import { useEffect, useState } from "react";

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [selectedMealDetails, setSelectedMealDetails] = useState(null);

  useEffect(() => {
    if (!ingredient) return;
    async function loadMealIdeas() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        const data = await response.json();
        setMeals(data.meals || []);
        setSelectedMealId(null);
        setSelectedMealDetails(null);
      } catch (error) {
        console.error("Failed to fetch meal ideas:", error);
      }
    }
    loadMealIdeas();
  }, [ingredient]);

  async function fetchMealDetails(mealId) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();
      setSelectedMealDetails(data.meals[0]);
    } catch (error) {
      console.error("Failed to fetch meal details:", error);
    }
  }

  const handleMealClick = (meal) => {
    const isSame = meal.idMeal === selectedMealId;
    if (isSame) {
      setSelectedMealId(null);
      setSelectedMealDetails(null);
    } else {
      setSelectedMealId(meal.idMeal);
      fetchMealDetails(meal.idMeal);
    }
  };

  const renderIngredients = (meal) => {
    if (!selectedMealDetails || selectedMealId !== meal.idMeal) return null;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = selectedMealDetails[`strIngredient${i}`];
      const measure = selectedMealDetails[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} ${measure ? `(${measure})` : ""}`);
      }
    }

    return (
      <div className="bg-white text-black p-4 rounded-md shadow mb-4">
        <p className="italic font-medium mb-2">Ingredients needed:</p>
        <ul className="list-disc pl-5">
          {ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="bg-blue-100 text-black p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Meal Ideas</h2>
      {ingredient && (
        <p className="italic text-center mb-4">
          Here are some meal ideas using <strong>{ingredient}</strong>:
        </p>
      )}
      {meals.length === 0 && (
        <p className="text-center text-gray-500">
          Select an item to see meal ideas
        </p>
      )}
      {meals.map((meal) => (
        <div key={meal.idMeal}>
          <button
            onClick={() => handleMealClick(meal)}
            className={`w-full text-left bg-white text-black px-4 py-2 rounded-md shadow mb-2 border-2 border-blue-200 hover:bg-blue-50 transition ${
              selectedMealId === meal.idMeal ? "ring-2 ring-blue-400" : ""
            }`}
          >
            {meal.strMeal}
          </button>
          {renderIngredients(meal)}
        </div>
      ))}
    </section>
  );
}
