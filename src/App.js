import "./App.css";
import React from "react";
// import axios from "axios";
import ItemContainer from "./ItemContainer";
import { ItemProvider } from "./ItemContext";

function App() {
  return (
    <div className="App">
      <h1>Angel's Wishlist</h1>
      <ItemProvider>
        <ItemContainer />
      </ItemProvider>
    </div>
  );
}

export default App;
