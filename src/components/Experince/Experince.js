 import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCard"; 
import erp from "../../Assets/Projects/ERP.jpg";
import b2b from "../../Assets/Projects/B2B.jpg";
import salesforce from "../../Assets/Projects/SalesForce.jpg";
import parking from "../../Assets/Projects/Parking.jpg";
import mechanic from "../../Assets/Projects/Mechanic.jpg";
import retails from "../../Assets/Projects/OMS_Retails.jpg";

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
          fontSize: "120px",
          fontWeight: "900",
          color: "var(--color-soft-yellow)",
          opacity: 0.5,
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
              <p style={{ color: "var(--color-navy-blue)", opacity: 0.9, maxWidth: "900px" }}>
                Working on scaling, optimization, and system design. Expertise in SQL, Edge Functions, RPC, and complex data management. 
                Integrating DSA concepts to solve high-level architectural challenges.
              </p>
            </div>
            <div style={timelineItemStyle}>
              <div style={dotStyle}></div>
              <h5 style={{ fontWeight: "bold", color: "var(--color-navy-blue)" }}>
                2023 - Feb 2025
              </h5>
              <h4 style={{ color: "var(--color-navy-blue)", fontWeight: "800" }}>
                Mid-level Mobile Developer (Flutter) — <a href="https://globaltechnepal.com/" target="_blank" rel="noreferrer" style={{color: "var(--color-olive-green)", textDecoration: "none"}}>Global Tech Nepal</a>
              </h4>
              <p style={{ color: "var(--color-navy-blue)", opacity: 0.9, maxWidth: "900px", marginBottom: "30px" }}>
                Developed cross-platform apps using MVC and Clean Architecture. Managed state with GetX/BLoC and integrated .NET APIs and Firebase.
              </p>

              <h5 style={{ color: "var(--color-navy-blue)", fontWeight: "700", marginBottom: "30px" }}>
                Developed Products:
              </h5>
               
            <Row className="justify-content-center">
              {[
                { img: erp, title: "OMS ERP", link: "https://play.google.com/store/apps/details?id=com.globaltech.erpsolution&hl=en_AU" },
                { img: retails, title: "OMS Retails", link: "https://play.google.com/store/apps/details?id=com.omsretails.retailsoms.oms&hl=en" },
                { img: b2b, title: "OMS B2B", link: "https://play.google.com/store/apps/details?id=com.globaltech.b2b&hl=en_AU" },
                { img: salesforce, title: "OMS Salesforce", link: "https://play.google.com/store/apps/details?id=com.solution.omssalesforce&hl=en_AU" },
                { img: parking, title: "OMS Parking", link: "https://play.google.com/store/apps/details?id=com.solution.omsparking&hl=en_AU" },
                { img: mechanic, title: "OMS Mechanic", link: "https://play.google.com/store/apps/details?id=com.globaltech.mechanic&hl=en_AU" }
              ].map((item, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-4">
              <ProjectCard
                imgPath={item.img}
                title={item.title}
                demoLink={item.link}
            />
    </Col>
  ))}
</Row>
            </div>

          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Experience;