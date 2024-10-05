import React from "react";
import Item from "./Item";
import "./ItemContainer.css";
import AddItem from "./AddItem";

function ItemContainer() {
  return (
    <>
      <div data-testid="item-container" className="container">
        <Item name="Cool toy" price="$12" link="link" />
        <Item name="phone" price="$100" link="link" />
      </div>
      <div>
        <AddItem />
      </div>
    </>
  );
}

export default ItemContainer;
