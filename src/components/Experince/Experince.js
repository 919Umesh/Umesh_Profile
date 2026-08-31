import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Experience() {
  const timelineItemStyle = {
    position: "relative",
    paddingLeft: "30px",
    marginBottom: "60px",
    borderLeft: "2px solid var(--color-navy-blue)",
    textAlign: "left"
  };

  const dotStyle = {
    position: "absolute",
    left: "-7px",
    top: "0",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "var(--color-navy-blue)"
  };

  const products = [
    { title: "OMS ERP", link: "https://play.google.com/store/apps/details?id=com.globaltech.erpsolution&hl=en_AU" },
    { title: "OMS Retails", link: "https://play.google.com/store/apps/details?id=com.omsretails.retailsoms.oms&hl=en" },
    { title: "OMS B2B", link: "https://play.google.com/store/apps/details?id=com.globaltech.b2b&hl=en_AU" },
    { title: "OMS Salesforce", link: "https://play.google.com/store/apps/details?id=com.solution.omssalesforce&hl=en_AU" },
    { title: "OMS Parking", link: "https://play.google.com/store/apps/details?id=com.solution.omsparking&hl=en_AU" },
    { title: "OMS Mechanic", link: "https://play.google.com/store/apps/details?id=com.globaltech.mechanic&hl=en_AU" }
  ];

  return (
    <Container fluid id="experience" style={{ 
      backgroundColor: "var(--color-cream-white)",
      padding: "100px 0",
      position: "relative",
      overflow: "hidden"
    }}>
      <Container>
        <h1 style={{
          position: "absolute",
          top: "10px", 
          left: "20px",
          fontSize: "80px",
          fontWeight: "900",
          color: "var(--color-navy-blue)",
          zIndex: 0,
          lineHeight: "1"
        }}>
          work.
        </h1>

        <Row style={{ position: "relative", zIndex: 1, marginTop: "80px" }}> 
          <Col md={12}>
            <div style={timelineItemStyle}>
              <div style={dotStyle}></div>
              <h5 style={{ fontWeight: "bold", color: "var(--color-navy-blue)" }}>
                Feb 2025 - Present
              </h5>
              <h4 style={{ color: "var(--color-navy-blue)", fontWeight: "800" }}>
                Software Engineer — <a href="https://www.inovaara.com/" target="_blank" rel="noreferrer" style={{color: "var(--color-olive-green)", textDecoration: "none"}}>Inovaara Technologies</a>
              </h4>
              <p style={{ color: "var(--color-navy-blue)", opacity: 0.9, maxWidth: "900px", marginBottom: "25px" }}>
                Working on scaling, optimization, and system design. Expertise in SQL, Edge Functions, RPC, and complex data management. 
                Integrating DSA concepts to solve high-level architectural challenges.
              </p>

              <h5 style={{ color: "var(--color-navy-blue)", fontWeight: "700", marginBottom: "15px" }}>
                Developed Products:
              </h5>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href="https://krayam.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="product-list-link"
                  style={{
                    color: "var(--color-navy-blue)",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "fit-content"
                  }}
                >
                  <span style={{ color: "var(--color-navy-blue)", opacity: 0.6 }}>•</span>
                  <span>Krayam</span>
                  <span style={{ fontSize: "0.95rem", opacity: 0.7 }}>↗</span>
                </a>
              </div>
            </div>

            <div style={timelineItemStyle}>
              <div style={dotStyle}></div>
              <h5 style={{ fontWeight: "bold", color: "var(--color-navy-blue)" }}>
                2023 - Feb 2025
              </h5>
              <h4 style={{ color: "var(--color-navy-blue)", fontWeight: "800" }}>
                Mid-level Mobile Developer (Flutter) — <a href="https://globaltechnepal.com/" target="_blank" rel="noreferrer" style={{color: "var(--color-olive-green)", textDecoration: "none"}}>Global Tech Nepal</a>
              </h4>
              <p style={{ color: "var(--color-navy-blue)", opacity: 0.9, maxWidth: "900px", marginBottom: "25px" }}>
                Developed cross-platform apps using MVC and Clean Architecture. Managed state with GetX/BLoC and integrated .NET APIs and Firebase.
              </p>

              <h5 style={{ color: "var(--color-navy-blue)", fontWeight: "700", marginBottom: "15px" }}>
                Developed Products:
              </h5>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {products.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="product-list-link"
                    style={{
                      color: "var(--color-navy-blue)",
                      textDecoration: "none",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "fit-content"
                    }}
                  >
                    <span style={{ color: "var(--color-navy-blue)", opacity: 0.6 }}>•</span>
                    <span>{item.title}</span>
                    <span style={{ fontSize: "0.95rem", opacity: 0.7 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Experience;