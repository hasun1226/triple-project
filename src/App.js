import React from "react";
import Attractions from "./Attractions";
import SearchBar from "./SearchBar";
import {ThemeContextProvider} from "./context/ThemeContext";
import "./main.css";

export default function App() {

  return (
    <div className="wrapper">
      <ThemeContextProvider>
        <SearchBar />
        <Attractions />
      </ThemeContextProvider>
    </div>
  );
}
