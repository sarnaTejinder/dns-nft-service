import React from "react";
import { Card, Container } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Container
      id="about"
      style={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        scrollSnapAlign: "start",
      }}
    >
      <p
        style={{
          fontFamily: `Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`,
          fontSize: 70,
          zIndex: 100,
          color: `rgb(5, 86, 126)`,
        }}
      >
        About Us
      </p>
      <Card style={{ width: "72%" }}>
        <Card.Body>
          <Card.Text
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
              fontSize: 18,
            }}
          >
            In this project we seek to create a platform to remove the security
            and privacy issues related to web2 Domain Name Service(DNS) system
            by building an NFT based Domain Name Service. For this, we have used
            Solidity for writing the smart contracts, MetaMask Wallet to connect
            users’ wallet to the dApp (Decentralized Application), web3.js for
            creating web3 application, ReactJs for frontend, SCSS for styling
            the application, Vercel for deploying the frontend application and
            Hardhat to deploy the smart contracts and dApp. And we have used
            Polygon Network to work on because it is carbon neutral and it has a
            low gas fee.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
