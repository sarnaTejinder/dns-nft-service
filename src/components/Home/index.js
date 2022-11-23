import React from "react";
import { Container } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import ConnectButton from "../ConnectButton";

export default function Home() {
  return (
    <Container
      id="home"
      style={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        scrollSnapAlign: "start",
      }}
    >
      <div
        style={{
          fontFamily: `Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`,
          fontSize: 70,
          zIndex: 100,
          color: `rgb(5, 86, 126)`,
        }}
      >
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 40,
            typeSpeed: 70,
            strings: ["SHINE NAME SERVICE 🌟"],
          }}
        />
      </div>
      <ConnectButton />
    </Container>
  );
}
