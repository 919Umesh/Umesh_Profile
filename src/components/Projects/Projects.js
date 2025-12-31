import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import erp from "../../Assets/Projects/ERP.jpg";
import b2b from "../../Assets/Projects/B2B.jpg";
 import salesforce from "../../Assets/Projects/SalesForce.jpg";
  import parking from "../../Assets/Projects/Parking.jpg";
 import mechanic from "../../Assets/Projects/Mechanic.jpg";
 import retails from "../../Assets/Projects/OMS_Retails.jpg";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={erp}
              isBlog={false}
              title="OMS ERP"
              description="OMS ERP (Order Management System Enterprise Resource Planning) refers to a type of ERP (Enterprise Resource Planning) software specifically designed to manage and streamline order-related processes within an organization."
              demoLink="https://play.google.com/store/apps/details?id=com.globaltech.erpsolution&hl=en_AU"
            />
          </Col>
               
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={retails}
              isBlog={false}
              title="OMS Retails"
              description="Transform Your Retail Business with Our All-Inclusive Retails App"
              demoLink="https://play.google.com/store/apps/details?id=com.omsretails.retailsoms.oms&hl=en"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={b2b}
              isBlog={false}
              title="OMS B2B"
              description="OMS B2B (Order Management System for Business-to-Business) refers to an order management solution specifically tailored for B2B companies. Unlike B2C (Business-to-Consumer) systems, which focus on individual consumers, B2B OMS solutions are designed to handle the complexities and scale of transactions between businesses"
              demoLink="https://play.google.com/store/apps/details?id=com.globaltech.b2b&hl=en_AU"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={salesforce}
              isBlog={false}
              title="OMS Salesforce"
              description="OMS (Order Management System) in Salesforce refers to the integration of order management capabilities within the Salesforce ecosystem. Salesforce offers a comprehensive suite of tools for managing customer relationships, sales, and order processes, which can be extended to include order management functionalities"
              demoLink="https://play.google.com/store/apps/details?id=com.solution.omssalesforce&hl=en_AU"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={parking}
              isBlog={false}
              title="OMS Parking"
              description="OMS Parking Mobile Application used to calculate all entry and exit of vehicle in the parking places."
              demoLink="https://play.google.com/store/apps/details?id=com.solution.omsparking&hl=en_AU"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mechanic}
              isBlog={false}
              title="OMS Mechanic"
              description="OMS Mechanic generally refers to a specific type of Order Management System (OMS) tailored for the automotive repair and maintenance industry"
              demoLink="https://play.google.com/store/apps/details?id=com.globaltech.mechanic&hl=en_AU"
            />
          </Col>
          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
