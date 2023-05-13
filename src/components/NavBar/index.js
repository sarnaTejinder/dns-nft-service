import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaHome, FaInfoCircle, FaBook } from "react-icons/fa";
import { matchPath, useHistory, withRouter } from "react-router-dom";
import IconText from "../IconText";
import WalletContext from "../../contexts/WalletContext";

export default function NavBar() {
  const { currentAccount } = useContext(WalletContext);
  return (
    <Navbar bg="light" expand="lg" id="navbar-shine" fixed="top">
      <Container>
        <Navbar.Brand href="/#home">Shine Name Service</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavItem href={"#home"} icon={<FaHome />} text="Home" />
            <NavItem href={"#about"} icon={<FaInfoCircle />} text="About Us" />
            <NavItem href={"#steps"} icon={<FaBook />} text="Steps" />
          </Nav>
        </Navbar.Collapse>
      </Container>
      {currentAccount && currentAccount !== null && (
        <span
          style={{
            marginRight: 8,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: "#e5e5e5",
            borderRadius: 6,
          }}
        >
          {currentAccount?.slice(0, 6)}...{currentAccount?.slice(36, 42)}
        </span>
      )}
    </Navbar>
  );
}

const NavItem = withRouter((props) => {
  const history = useHistory();

  const isMatch = matchPath(history?.location.hash, {
    path: props.href,
    exact: false,
    strict: false,
  });

  return (
    <Nav.Link href={props.href}>
      <IconText icon={props.icon} text={props.text} active={isMatch} />
    </Nav.Link>
  );
});
