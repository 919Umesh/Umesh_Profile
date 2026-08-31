import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";

function Contact() {
  const contactInfoStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
    color: "var(--color-navy-blue)",
    textDecoration: "none",
    fontSize: "1.15rem",
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
    <Container
      fluid
      id="contact"
      style={{
        backgroundColor: "var(--color-cream-white)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Container>
        <h1
          style={{
            position: "absolute",
            top: "10px",
            left: "20px",
            fontSize: "80px",
            fontWeight: "900",
            color: "var(--color-navy-blue)",
            zIndex: 0,
            lineHeight: "1"
          }}
        >
          contact.
        </h1>

        <Row style={{ position: "relative", zIndex: 1, marginTop: "80px" }}>
          <Col md={10} lg={8}>
            <a
              href="tel:9868732774"
              style={contactInfoStyle}
              className="contact-info-link"
            >
              <div style={iconCircleStyle}>
                <FaPhoneAlt />
              </div>
              <p style={{ margin: 0 }}>
                <strong style={{ marginRight: "10px" }}>Call me:</strong>
                9868732774
              </p>
            </a>

            <a
              href="mailto:thakuriumesh919@gmail.com"
              style={contactInfoStyle}
              className="contact-info-link"
            >
              <div style={iconCircleStyle}>
                <FaEnvelope />
              </div>
              <p style={{ margin: 0 }}>
                <strong style={{ marginRight: "10px" }}>Email:</strong>
                thakuriumesh919@gmail.com
              </p>
            </a>

            <a
              href="https://github.com/919Umesh"
              target="_blank"
              rel="noreferrer"
              style={contactInfoStyle}
              className="contact-info-link"
            >
              <div style={iconCircleStyle}>
                <FaGithub />
              </div>
              <p style={{ margin: 0 }}>
                <strong style={{ marginRight: "10px" }}>GitHub:</strong>
                github.com/919Umesh
              </p>
            </a>

            <a
              href="https://x.com/UmeshSh56100400"
              target="_blank"
              rel="noreferrer"
              style={contactInfoStyle}
              className="contact-info-link"
            >
              <div style={iconCircleStyle}>
                <FaTwitter />
              </div>
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