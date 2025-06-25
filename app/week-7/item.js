
export default function Item({ name, quantity, category }) {
  return (
    <div className="flex flex-col items-center">
        <li className="border rounded p-3 mb-2 shadow-sm bg-blue-100">
        <p className="font-semibold">{name}</p>
        <p>Quantity: {quantity}</p>
        <p className="text-sm text-gray-600">Category: {category}</p>
        </li>
    </div>
  );
}