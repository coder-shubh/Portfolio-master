// src/components/Experience.js

import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import '../style.css';

const Experience = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const experiences = [
    {
      company: "EY GDS (Ernst and Young)",
      role: "Senior Software Engineer",
      duration: "Apr 2024 - Present",
      description: `
        <ul>
          <li>Leading the development of complex mobile applications for iOS and Android platforms.</li>
          <li>Architecting scalable and maintainable mobile solutions using technologies such as React Native or Flutter.</li>
          <li>Collaborating with UX/UI designers to create intuitive and visually appealing user interfaces.</li>
          <li>Implementing secure authentication and data management practices.</li>
          <li>Managing the full mobile development lifecycle, from initial design to deployment on App Store and Google Play.</li>
          <li>Conducting code reviews, mentoring junior developers, and ensuring adherence to best practices.</li>
        </ul>
      `
    },
    {
      company: "Digimonk Technologies Pvt Ltd.",
      role: "Software Engineer",
      duration: "Aug 2023 - Mar 2024",
      description: `
        <ul>
          <li>Designing and developing high-performance mobile apps for both iOS and Android using Kotlin, Swift, or cross-platform frameworks.</li>
          <li>Working closely with product managers and designers to understand user requirements and deliver functional solutions.</li>
          <li>Implementing APIs and integrating third-party services to enhance app functionality.</li>
          <li>Performing thorough testing and debugging to ensure a seamless user experience.</li>
          <li>Utilizing analytics and user feedback to iterate on features and improve app performance.</li>
        </ul>
      `
    },
    {
      company: "Mavesys Infosoft Pvt Ltd.",
      role: "Software Engineer",
      duration: "Dec 2021 - Aug 2023",
      description: `
        <ul>
          <li>Developing native mobile applications for iOS and Android using Swift and Java/Kotlin.</li>
          <li>Creating responsive and adaptive layouts to ensure compatibility across various devices and screen sizes.</li>
          <li>Integrating with backend services and databases to manage user data and application state.</li>
          <li>Conducting user acceptance testing and resolving issues to deliver high-quality applications.</li>
          <li>Collaborating with cross-functional teams to define technical requirements and project timelines.</li>
        </ul>
      `
    },
    {
      company: "Omnetway InfoSystem Pvt Ltd.",
      role: "Android Application Developer",
      duration: "Feb 2021 - Dec 2021",
      description: `
        <ul>
          <li>Assisting in the development of mobile applications for Android using Java.</li>
          <li>Supporting the senior developers in implementing features and debugging issues.</li>
          <li>Writing clean, maintainable code and following established coding standards.</li>
          <li>Participating in daily stand-ups and contributing to project planning and reviews.</li>
          <li>Learning and applying best practices in mobile development and keeping up-to-date with the latest industry trends.</li>
        </ul>
      `
    }
  ];
  
  
  const handleShow = (exp) => {
    setModalContent(exp);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="experience-container">
      <h1 className="project-heading">
        My <strong className="purple">Experience</strong>
      </h1>
      <div className="experience-section">
        {experiences.map((exp, index) => (
          <Card key={index} className="tech-icons" onClick={() => handleShow(exp)}>
            <Card.Body className="quote-card-view">
              <Card.Title className="experience-company">{exp.company}</Card.Title>
              <Card.Subtitle className="experience-role">{exp.role}</Card.Subtitle>
              <Card.Text className="experience-duration">{exp.duration}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="experience-company">{modalContent.company}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="experience-role">{modalContent.role}</h5>
          <div dangerouslySetInnerHTML={{ __html: modalContent.description }} />
          <p><strong>Duration:</strong> {modalContent.duration}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Experience;
