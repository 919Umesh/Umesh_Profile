import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function About() {
  const timelineItemStyle = {
    position: "relative",
    paddingLeft: "30px",
    marginBottom: "40px",
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

  return (
    <Container fluid id="about" style={{ 
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
          fontSize: "120px",
          fontWeight: "900",
          color: "var(--color-soft-yellow)",
          opacity: 0.5,
          zIndex: 0,
          lineHeight: "1"
        }}>
          about.
        </h1>

        <Row style={{ position: "relative", zIndex: 1, marginTop: "80px" }}> 
          <Col md={10} lg={8}>
            <p style={{ 
              color: "var(--color-navy-blue)", 
              fontSize: "1.2rem", 
              lineHeight: "1.8",
              marginBottom: "60px",
              fontWeight: "500"
            }}>
              I am a dedicated and results-driven Flutter Developer with 26 months of professional 
              experience in building cross-platform mobile applications using MVC and Clean Architecture 
              principles. Proficient in GetX, Provider, and BLoC.
            </p>

            <div className="timeline">
              <div style={timelineItemStyle}>
                <div style={dotStyle}></div>
                <h5 style={{ fontWeight: "bold", color: "var(--color-navy-blue)" }}>2022 - 2026 (Expected)</h5>
                <p style={{ color: "var(--color-navy-blue)", opacity: 0.8 }}>
                  <strong>B.IT (Bachelor of Information Technology)</strong><br />
                  Amrit Science Campus, Lainchaur. Focus on software engineering and mobile development.
                </p>
              </div>

              <div style={timelineItemStyle}>
                <div style={dotStyle}></div>
                <h5 style={{ fontWeight: "bold", color: "var(--color-navy-blue)" }}>2019 - 2021</h5>
                <p style={{ color: "var(--color-navy-blue)", opacity: 0.8 }}>
                  <strong>+2 Science</strong><br />
                  Premier College, New Baneshwor. Graduated with a strong foundation in physics and mathematics.
                </p>
              </div>

              <div style={timelineItemStyle}>
                <div style={dotStyle}></div>
                <h5 style={{ fontWeight: "bold", color: "var(--color-navy-blue)" }}>SEE - 2019</h5>
                <p style={{ color: "var(--color-navy-blue)", opacity: 0.8 }}>
                  <strong>Secondary Level</strong><br />
                  Shree Adarsha Namuna Secondary School, Lamki Kailali.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;