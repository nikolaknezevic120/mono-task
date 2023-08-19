import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="light" variant="light" className="mt-5">
      <Container>
        <Navbar.Text>
          &copy; {new Date().getFullYear()} Mono Shop - task. Application created by: Nikola Knežević 
        </Navbar.Text>
        <Nav className="ms-auto">
          <Nav.Link href="">Privacy Policy</Nav.Link>
          <Nav.Link href="">Terms of Service</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
