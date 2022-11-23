import React, { useContext, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import AboutUs from "../../components/AboutUs";
import Home from "../../components/Home";
import Steps from "../../components/Steps";
// import WalletContext from "../../contexts/WalletContext";
// import { useHistory } from "react-router-dom";
let last_known_scroll_position = 0;
let ticking = false;
let height = window.screen.height;

export default function LandingPage() {
  // const { currentAccount, errorStatus } = useContext(WalletContext);
  // const history = useHistory();

  // useEffect(() => {
  //   if (currentAccount) {
  //     history.replace("/mint");
  //   }
  // }, [currentAccount, history]);

  return (
    <div
      style={{
        scrollSnapType: "y ",
        maxHeight: "100vh",
        overflowY: "scroll",
        scrollbarWidth: "none",
        scrollbarColor: "transparent",
        scrollBehavior: "smooth",
      }}
    >
      <Home />
      <AboutUs />
      <Steps />
    </div>
  );
}
