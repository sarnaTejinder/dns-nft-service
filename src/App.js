import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { WalletProvider } from "./contexts/WalletContext.js";
import { MintProvider } from "./contexts/MintContext";

function App() {
  return (
    <div className="App">
      <WalletProvider>
        <MintProvider>
          <HomePage />
        </MintProvider>
      </WalletProvider>
    </div>
  );
}

export default App;
