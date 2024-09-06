// src/components/Experience.js

import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const Experience = () => {
  const experiences = [
    {
      company: "EY GDS (Ernst and Young)",
      role: "Senior Software Engineer",
      duration: "Dec 2021 - Aug 2023"
    },
    {
      company: "Digimonk Technologies Pvt Ltd.",
      role: "Software Engineer",
      duration: "Dec 2023 - Present"
    },
    {
      company: "Mavesys Infosoft Pvt Ltd.",
      role: "Software Engineer",
      duration: "Dec 2021 - Aug 2023"
    },
    {
      company: "Omnetway InfoSystem Pvt Ltd.",
      role: "Android Developer",
      duration: "Feb 2021 - Dec 2021"
    }
  ];

  return (
    <div>
      <h1 className="project-heading">
        My <strong className="purple">Experience</strong>
      </h1>
      <div className="experience-section">
        {experiences.map((exp, index) => (
          <Card key={index} style={{ marginBottom: "20px" }}>
            <Card.Body>
              <Card.Title>{exp.company}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{exp.role}</Card.Subtitle>
              <Card.Text>{exp.duration}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Experience;
