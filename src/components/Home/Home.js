import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/first.jpg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> UMESH SHAHI </strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
  <img
    src={homeLogo}
    alt="home pic"
    className="img-fluid"
    style={{
      maxHeight: "450px",
      borderRadius: "20px 100px 20px 100px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    }}
  />
</Col>      
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
