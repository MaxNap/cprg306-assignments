"use client"; 

import { useState } from "react";


export default function NewItem() {

    const [quantity, setQuantity] = useState(1);

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


    return (
        <div className="bg-blue-100 p-6 rounded-lg shadow-md max-w-sm mx-auto">
            <h2 className="text-xl font-semibold p-6">Quantity: {quantity}</h2>
            <div className="flex justify-center space-x-4">
                <button onClick={decrement} disabled={quantity === 1} className={`px-8 py-4 text-2xl font-bold rounded bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300`}>
                -
                </button>
                <button onClick={increment} disabled={quantity === 20} className={`px-8 py-4 text-2xl font-bold rounded bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300`}>
                +
                </button>
            </div>
        </div>
    )
}
