import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/first.jpg";
import pdf from "../../Assets/Umesh.pdf"; 
import About from "../About/About";
import Experience from "../Experince/Experince";
import Contact from "../Contact/Contact";

function Home() {
  return (
    <section>
      <Container 
        fluid 
        className="home-section" 
        id="home" 
        style={{ 
          minHeight: "100vh", 
          display: "flex", 
          alignItems: "center", 
          paddingTop: "100px", 
          paddingBottom: "50px"
        }}
      >
        <Container className="home-content">
          <Row style={{ alignItems: "center" }}>
            <Col md={7} className="home-header" style={{ textAlign: "left" }}>
              <h5 style={{ color: "var(--color-navy-blue)", fontWeight: "500", marginBottom: "20px" }}>
                Hello, I'm Umesh,
              </h5>

              <h1 style={{ 
                fontSize: "80px", 
                lineHeight: "1.1", 
                fontWeight: "900", 
                color: "var(--color-navy-blue)",
                margin: "0 0 20px 0"
              }}>
                Flutter <br /> Developer
              </h1>

              <h5 style={{ color: "var(--color-navy-blue)", opacity: 0.8, marginBottom: "40px" }}>
                based in Kathmandu.
              </h5>

            
              <a 
                href={pdf} 
                target="_blank" 
                rel="noreferrer" 
                style={{ textDecoration: "none" }}
              >
                <button style={{
                  backgroundColor: "var(--color-soft-yellow)",
                  border: "1px solid var(--color-navy-blue)",
                  padding: "10px 35px",
                  borderRadius: "8px",
                  color: "var(--color-olive-green)",
                  fontWeight: "600",
                  boxShadow: "4px 4px 0px var(--color-navy-blue)",
                  cursor: "pointer" 
                }}>
                  Resume
                </button>
              </a>
            </Col>

            <Col md={5} style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div style={{ 
                position: "absolute", 
                top: "10%", 
                right: "10%", 
                fontSize: "40px", 
                color: "var(--color-olive-green)",
                fontWeight: "bold",
                zIndex: 1
              }}>++</div>
              
              <div style={{ 
                position: "absolute", 
                bottom: "20%", 
                left: "5%", 
                fontSize: "30px", 
                color: "var(--color-olive-green)",
                letterSpacing: "5px",
                zIndex: 1
              }}></div>

              <div style={{
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                border: "1px solid var(--color-olive-green)",
                padding: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent"
              }}>
                <img
                  src={homeLogo}
                  alt="Umesh Shahi"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <About />
      <Experience />
      <Contact />
    </section>
  );
}

export default Home;