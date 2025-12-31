import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";

function Contact() {
  const inputStyle = {
    border: "none",
    borderBottom: "2px solid var(--color-navy-blue)",
    borderRadius: "0",
    backgroundColor: "transparent",
    padding: "12px 0",
    boxShadow: "none", 
    color: "var(--color-navy-blue)"
  };

  const contactInfoStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
    color: "var(--color-navy-blue)",
    textDecoration: "none",
    fontSize: "1.1rem",
    transition: "transform 0.2s ease"
  };

  const iconCircleStyle = {
    width: "45px",
    minWidth: "45px", 
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "var(--color-soft-yellow)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
    color: "var(--color-navy-blue)",
    border: "1px solid var(--color-navy-blue)"
  };

  return (
    <Container fluid id="contact" style={{ 
      backgroundColor: "var(--color-cream-white)",
      padding: "100px 0",
      position: "relative",
      overflow: "hidden"
    }}>
      <style>
        {`
          .form-control:focus {
            box-shadow: none !important;
            border-color: var(--color-navy-blue) !important;
            background-color: transparent !important;
          }
        `}
      </style>

      <Container>
        <h1 style={{
          position: "absolute",
          top: "10px", 
          left: "20px",
          fontSize: "120px",
          fontWeight: "900",
          color: "var(--color-soft-yellow)",
          opacity: 0.5,
          zIndex: 0,
          lineHeight: "1"
        }}>
          contact.
        </h1>

        <Row style={{ position: "relative", zIndex: 1, marginTop: "80px" }}>
          <Col md={6} style={{ paddingRight: "50px", marginBottom: "50px" }}>
            <h3 style={{ color: "var(--color-navy-blue)", fontWeight: "800", marginBottom: "30px" }}>
              Send me a message
            </h3>
            <Form>
              <Form.Group className="mb-4">
                <Form.Control type="text" placeholder="Your Name" style={inputStyle} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control type="email" placeholder="Email Address" style={inputStyle} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control as="textarea" rows={4} placeholder="Your Message" style={inputStyle} />
              </Form.Group>
              <Button style={{
                backgroundColor: "var(--color-soft-yellow)",
                border: "1px solid var(--color-navy-blue)",
                padding: "10px 40px",
                borderRadius: "8px",
                color: "var(--color-navy-blue)",
                fontWeight: "700",
                boxShadow: "4px 4px 0px var(--color-navy-blue)",
                marginTop: "10px"
              }}>
                Send Message
              </Button>
            </Form>
          </Col>

          <Col md={6} style={{ borderLeft: "1px solid rgba(0,0,0,0.1)", paddingLeft: "50px" }}>
            <h3 style={{ color: "var(--color-navy-blue)", fontWeight: "800", marginBottom: "30px" }}>
              Get in touch
            </h3>
            
            <div style={contactInfoStyle}>
              <div style={iconCircleStyle}><FaPhoneAlt /></div>
              <p style={{ margin: 0 }}>
                <strong style={{ marginRight: "10px" }}>Call me:</strong> 
                9868732774
              </p>
            </div>

            <a href="mailto:thakuriumesh919@gmail.com" style={contactInfoStyle}>
              <div style={iconCircleStyle}><FaEnvelope /></div>
              <p style={{ margin: 0 }}>
                <strong style={{ marginRight: "10px" }}>Email:</strong> 
                thakuriumesh919@gmail.com
              </p>
            </a>

            <a href="https://github.com/919Umesh" target="_blank" rel="noreferrer" style={contactInfoStyle}>
              <div style={iconCircleStyle}><FaGithub /></div>
              <p style={{ margin: 0 }}>
                <strong style={{ marginRight: "10px" }}>GitHub:</strong> 
                github.com/919Umesh
              </p>
            </a>

            <a href="https://x.com/UmeshSh56100400" target="_blank" rel="noreferrer" style={contactInfoStyle}>
              <div style={iconCircleStyle}><FaTwitter /></div>
              <p style={{ margin: 0 }}>
                <strong style={{ marginRight: "10px" }}>Twitter (X):</strong> 
                @UmeshSh56100400
              </p>
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;