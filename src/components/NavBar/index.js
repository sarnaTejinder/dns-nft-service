import React, { useMemo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaHome, FaInfoCircle, FaBook } from "react-icons/fa";
import { matchPath, useHistory, withRouter } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import IconText from "../IconText";

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg" id="navbar-shine" fixed="top">
      <Container>
        <Navbar.Brand href="/#home">Shine Name Service</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <NavItem href={"#home"} icon={<FaHome />} text="Home" />
            <NavItem href={"#about"} icon={<FaInfoCircle />} text="About Us" />
            <NavItem href={"#steps"} icon={<FaBook />} text="Steps" />
          </Nav>
        </Navbar.Collapse>
      </Container>
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
