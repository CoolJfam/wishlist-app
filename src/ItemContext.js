import { createContext, useState, useContext } from "react";

const ItemContext = createContext();
let itemId = 0;

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (text, price, link) => {
    const newItem = { text, price, link, id: itemId++ };
    setItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    const newItems = items.filter((_, i) => i !== id);
    setItems(newItems);
  };

  const updateItem = (newItem) => {
    const newItems = items.map((item) => {
      if (newItem.id === item.id) {
        return newItem;
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <ItemContext.Provider value={{ items, addItem, deleteItem, updateItem }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  return context;
}

export default ItemContext;
