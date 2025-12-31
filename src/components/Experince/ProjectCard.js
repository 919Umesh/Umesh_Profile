import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaGooglePlay } from "react-icons/fa";

function ProjectCard(props) {
  return (
    <Card style={{ 
      backgroundColor: "transparent", 
      border: "1px solid var(--color-navy-blue)",
      borderRadius: "15px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
      overflow: "hidden"
    }}
    className="h-100 shadow-sm"
    >
      <div style={{ 
        width: "100%", 
        paddingTop: "145%", 
        position: "relative",
        backgroundColor: "var(--color-cream-white)",
      }}>
        <Card.Img
          src={props.imgPath}
          alt="project-img"
          style={{
            position: "absolute",
            top: "15px", 
            left: "0",
            width: "100%", 
            height: "calc(100% - 15px)", 
            objectFit: "contain",
            objectPosition: "top center",
          }}
        />
      </div>

      <Card.Body style={{ 
        padding: "10px 15px 15px 15px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        flexGrow: 1 
      }}>
        <div style={{ textAlign: "center" }}>
          <Card.Title style={{ 
            fontSize: "1.05rem", 
            fontWeight: "bold", 
            color: "var(--color-navy-blue)",
            margin: "0"
          }}>
            {props.title}
          </Card.Title>
        </div>

        <Button
          href={props.demoLink}
          target="_blank"
          style={{
            backgroundColor: "var(--color-soft-yellow)",
            border: "1px solid var(--color-navy-blue)",
            color: "var(--color-navy-blue)",
            fontWeight: "600",
            fontSize: "0.85rem",
            width: "100%",
            marginTop: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          <FaGooglePlay size={12} /> View App
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;