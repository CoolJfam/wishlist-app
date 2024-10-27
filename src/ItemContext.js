import { createContext, useState, useContext } from "react";

const ItemContext = createContext();
let itemId = 0;

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (text, price, link) => {
    debugger
    const newItem = { text, price, link, id: itemId++ };
    setItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    debugger
    const newItems = items.filter((_, i) => i !== id);
    setItems(newItems);
  };

  return (
    <ItemContext.Provider value={{ items, addItem, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  return context;
}

export default ItemContext;
