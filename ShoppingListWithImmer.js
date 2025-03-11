import React from "react";
import { useImmer } from "use-immer";

const ShoppingListWithImmer = () => {
  const [shoppingList, updateShoppingList] = useImmer([
    { id: 1, name: "Apples", quantity: 2, details: { category: "Fruit", notes: "Red apples" } },
    { id: 2, name: "Milk", quantity: 1, details: { category: "Dairy", notes: "Low fat" } },
  ]);

  const addItem = () => {
    updateShoppingList((draft) => {
      draft.push({
        id: Date.now(),
        name: "New Item",
        quantity: 1,
        details: { category: "Unknown", notes: "" },
      });
    });
  };

  const updateItem = (id, newName) => {
    updateShoppingList((draft) => {
      const item = draft.find((item) => item.id === id);
      if (item) item.name = newName;
    });
  };

  const removeItem = (id) => {
    updateShoppingList((draft) => {
      return draft.filter((item) => item.id !== id);
    });
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {shoppingList.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} ({item.details.category})
            <button onClick={() => updateItem(item.id, prompt("New name:", item.name))}>
              Update
            </button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default ShoppingListWithImmer;
