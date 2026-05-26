import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaGooglePlay } from "react-icons/fa";

function ProjectCard(props) {
  return (
    <Card style={{ 
      backgroundColor: "var(--color-cream-white)", 
      border: "2px solid var(--color-navy-blue)",
      borderRadius: "12px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      overflow: "hidden",
      boxShadow: "6px 6px 0px var(--color-navy-blue)",
      position: "relative"
    }}
    className="h-100 project-card"
    >
      {/* Decorative Neo-brutalist Window Header */}
      <div style={{
        backgroundColor: "var(--color-soft-yellow)",
        borderBottom: "2px solid var(--color-navy-blue)",
        padding: "10px 15px",
        display: "flex",
        gap: "8px"
      }}>
        <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--color-navy-blue)", backgroundColor: "var(--color-cream-white)" }}></div>
        <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--color-navy-blue)", backgroundColor: "var(--color-cream-white)" }}></div>
        <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--color-navy-blue)", backgroundColor: "var(--color-cream-white)" }}></div>
      </div>

      <Card.Body style={{ 
        padding: "40px 20px 30px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1 
      }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Card.Title style={{ 
            fontSize: "1.5rem", 
            fontWeight: "900", 
            color: "var(--color-navy-blue)",
            margin: "0",
            lineHeight: "1.2",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            {props.title}
          </Card.Title>
        </div>

        <Button
          href={props.demoLink}
          target="_blank"
          className="project-btn"
          style={{
            backgroundColor: "transparent",
            border: "2px solid var(--color-navy-blue)",
            borderRadius: "8px",
            color: "var(--color-navy-blue)",
            fontWeight: "800",
            fontSize: "1rem",
            padding: "12px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "3px 3px 0px var(--color-navy-blue)",
            transition: "all 0.2s ease",
            marginTop: "auto",
            textTransform: "uppercase"
          }}
        >
          <FaGooglePlay size={16} /> View App
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
