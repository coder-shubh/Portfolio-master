import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/upwordo.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/plexys.png";

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
              imgPath={"https://play-lh.googleusercontent.com/C965UDXJD5HKGq8bXtVmRRIHiioX22GEtkewdX6jqpXS6BGvLKVmfW-9PZ6Ks7pTag=w2560-h1440-rw"}
              isBlog={false}
              title="MaveKart"
              description="MaveKart is an e-commerce app developed first in Android Studio and then migrated to React Native. It offers a wide product range, secure payments, user accounts, and seller functionalities. The migration to React Native ensures a seamless cross-platform experience for users"
            // ghLink="https://github.com/soumyajit4419/Chatify"
            // demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={"https://play-lh.googleusercontent.com/WYfA2Jml_3mzip9JQSCAkjccYeJK7-MOvVAUdGseX3-3FtNlYr_SDzmPz7WFsH8Suw4=w2560-h1440-rw"}
              isBlog={false}
              title="goBanquet"
              description="Our Banquet Hall Booking application, built using React Native, offers a seamless and user-friendly experience for individuals or businesses looking to reserve banquet halls for various events. Whether you're organizing a wedding reception, corporate conference, birthday party, or any other special occasion, our app simplifies the process of finding and booking the perfect venue."
            // ghLink="https://github.com/soumyajit4419/Bits-0f-C0de"
            // demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={"https://play-lh.googleusercontent.com/gfGsuxEZTaw-sU002QEvJ3vVYMki3nc166Q2OH-0UspEHE7SwHhpYcgQ5-aPzv0Zkg=w2560-h1440-rw"}
              isBlog={false}
              title="SAMARPAN"
              description="SAMARPAN is a cutting-edge mobile application designed to streamline attendance tracking for businesses, organizations, schools, and any group or event where attendance is essential. This powerful and user-friendly app revolutionizes the way attendance is marked by incorporating location and picture verification, ensuring accuracy and accountability like never before"
            // ghLink="https://github.com/soumyajit4419/Editor.io"
            // demoLink="https://editor.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={"https://play-lh.googleusercontent.com/af07kljkWNFzYzuAIhen3rA0eoI6ooBvFT34laB9nxNxLqrXSdTk_bT3O6d7ZesrXbs=w2560-h1440-rw"}
              isBlog={false}
              title="AshTech"
              description="AshTech is a mobile app where users can buy and sell Fly Ash. It offers a user-friendly interface for browsing Fly Ash products, secure payment options, and a rating system. The app connects buyers and sellers, making it easier to trade Fly Ash in a transparent marketplace."
            // ghLink="https://github.com/soumyajit4419/Plant_AI"
            // demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Upwordo"
              description="Upwordo: Your go-to app for mastering German! Elevate your skills with fun vocabulary tests, interactive lessons, and smart learning. Learn anytime, anywhere, and watch your fluency soar. Join Upwordo and make every moment a step towards German proficiency! 🇩🇪✨"
            // ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
            // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Plexys"
              description="Plexys: Your pain partner. Calculate and track pain levels, take interactive tests, and visualize your health journey with intuitive graphs. Your data, your privacy—Plexys empowers you to manage pain, one insightful chart at a time. Take charge of your well-being, download Plexys now. 📊💪"
            // ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
            // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
