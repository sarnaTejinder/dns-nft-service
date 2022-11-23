import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "../../components/NavBar";
import LandingPage from "../LandingPage";
import MintPage from "../MintPage";

export default function HomePage() {
  return (
    <Router>
      <NavBar />
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/mint">
        <MintPage />
      </Route>
    </Router>
  );
}
