import React from "react";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";
import IconText from "../IconText";
import { HiLink } from "react-icons/hi";
import { FaRegKeyboard, FaLocationArrow } from "react-icons/fa";
export default function Steps() {
  return (
    <Container
      id="steps"
      style={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 100,
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
        How To Use
      </p>
      <Container fluid>
        <CardGroup className="g-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <IconText
                  icon={<HiLink fontWeight={600} size={24} />}
                  left={false}
                  text={
                    <div style={{ fontSize: 24, fontWeight: 600 }}>
                      Connect Wallet
                    </div>
                  }
                />
              </Card.Title>
              <Card.Text
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  fontSize: 20,
                  padding: 15,
                }}
              >
                Click on the <b>Connect Wallet</b> button and connect your
                wallet by selecting the <b>Desired Account</b> from the popup.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>
                <IconText
                  icon={<FaRegKeyboard fontWeight={600} size={24} />}
                  left={false}
                  text={
                    <div style={{ fontSize: 24, fontWeight: 600 }}>
                      Enter your Domain
                    </div>
                  }
                />
              </Card.Title>
              <Card.Text
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  fontSize: 20,
                  padding: 15,
                }}
              >
                Enter your <b>Domain Name</b> in the text area provided and
                click on the <b>Create Domain</b> button and your NFT will be
                minted.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>
                <IconText
                  icon={<FaLocationArrow fontWeight={600} size={24} />}
                  left={false}
                  text={
                    <div style={{ fontSize: 24, fontWeight: 600 }}>
                      View on OpenSea
                    </div>
                  }
                />
              </Card.Title>
              <Card.Text
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  fontSize: 20,
                  padding: 15,
                }}
              >
                Click on the <b>Domain Name</b> generated and it will redirect
                you to your NFT on opensea with all the details you have stored.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    </Container>
  );
}
