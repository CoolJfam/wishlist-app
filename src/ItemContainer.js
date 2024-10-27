import React from "react";
import Item from "./Item";
import "./ItemContainer.css";
import AddItem from "./AddItem";

function ItemContainer() {
  return (
    <>
      <div data-testid="item-container" className="container">
        <Item />
      </div>
      <div>
        <AddItem />
      </div>
    </>
  );
}

export default ItemContainer;
