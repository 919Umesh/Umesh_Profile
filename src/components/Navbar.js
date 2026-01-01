import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom"; 
import { FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa"; 
function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [updateNavbar] = useState(false);
  const navigate = useNavigate();

  function scrollHandler() {
    updateNavbar(window.scrollY >= 20);
  }

  window.addEventListener("scroll", scrollHandler);

  const scrollToSection = (sectionId) => {
    updateExpanded(false);
    navigate("/"); 
    
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const navLinkStyle = {
    color: "var(--color-navy-blue)",
    fontWeight: "500",
    fontSize: "18px",
    margin: "0 15px",
    cursor: "pointer"
  };

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className="navbar"
      style={{
        backgroundColor: "transparent",
        padding: "30px 0",
        position: "absolute", 
        width: "100%",
        top: 0,
        zIndex: 1000
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <span style={{ fontSize: "28px", fontWeight: "bold", color: "var(--color-navy-blue)" }}>
            Umesh Shahi
          </span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(expand ? false : "expanded")}
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)} style={navLinkStyle}>
              Home
            </Nav.Link>
            
            <Nav.Link 
              as="span" 
              onClick={() => scrollToSection("about")} 
              style={navLinkStyle}
            >
              About
            </Nav.Link>
           
            <Nav.Link 
              as="span" 
              onClick={() => scrollToSection("experience")} 
              style={navLinkStyle}
            >
              Work
            </Nav.Link>
            <Nav.Link 
              as="span" 
              onClick={() => scrollToSection("contact")} 
              style={navLinkStyle}
            >
              Contact
            </Nav.Link>
          </Nav>

          {/* Updated Social Links Section */}
          <Nav className="ms-auto d-none d-md-flex" style={{ alignItems: "center", gap: "25px" }}>
            <Nav.Link href="https://github.com/919Umesh" target="_blank" rel="noreferrer" style={{color: "var(--color-navy-blue)"}}>
              <FaGithub size={24} />
            </Nav.Link>
            
            <Nav.Link href="https://x.com/UmeshSh56100400" target="_blank" rel="noreferrer" style={{color: "var(--color-navy-blue)"}}>
              <FaTwitter size={22} />
            </Nav.Link>

            <Nav.Link href="mailto:thakuriumesh919@gmail.com" style={{color: "var(--color-navy-blue)"}}>
              <FaEnvelope size={22} />
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;