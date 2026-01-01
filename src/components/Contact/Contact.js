import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";
import { sendContactEmail } from "./Email"; // Ensure this path is correct

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" }); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.msg) setStatus({ type: "", msg: "" }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "danger", msg: "Fields cannot be empty!" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", msg: "" });

    const result = await sendContactEmail(formData);

    setLoading(false);
    if (result.success) {
      setStatus({ type: "success", msg: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
    } else {
      setStatus({ type: "danger", msg: "Failed to send message. Please try again." });
    }
  };

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
          /* Standard Focus State */
          .form-control:focus {
            box-shadow: none !important;
            border-color: var(--color-navy-blue) !important;
            background-color: transparent !important;
          }

          /* FIX: Removing the White Autofill Background */
          .form-control:-webkit-autofill,
          .form-control:-webkit-autofill:hover, 
          .form-control:-webkit-autofill:focus, 
          .form-control:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px var(--color-cream-white) inset !important;
            -webkit-text-fill-color: var(--color-navy-blue) !important;
            transition: background-color 5000s ease-in-out 0s;
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

            {status.msg && (
              <Alert variant={status.type} style={{ borderRadius: "8px", fontWeight: "600" }}>
                {status.msg}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Control 
                  name="name"
                  type="text" 
                  placeholder="Your Name" 
                  style={inputStyle} 
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control 
                  name="email"
                  type="email" 
                  placeholder="Email Address" 
                  style={inputStyle} 
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control 
                  name="message"
                  as="textarea" 
                  rows={4} 
                  placeholder="Your Message" 
                  style={inputStyle} 
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button 
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "var(--color-soft-yellow)",
                  border: "1px solid var(--color-navy-blue)",
                  padding: "10px 40px",
                  borderRadius: "8px",
                  color: "var(--color-navy-blue)",
                  fontWeight: "700",
                  boxShadow: "4px 4px 0px var(--color-navy-blue)",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" animation="border" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
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