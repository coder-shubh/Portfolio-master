import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Shubham Kumar Singh </span>
            from <span className="purple"> Greater Noida, India.</span>
            <br /> A seasoned mobile application developer with <span className="purple">3+ years </span> of hands-on experience shaping digital solutions. Currently immersed in the dynamic realm of mobile development at <span className="purple"> EY GDS (Ernst & Young) </span>, I bring a wealth of expertise in crafting intuitive and efficient applications.
            <br />
            I'm a passionate and creative Mobile Application Developer with a strong background in building apps for both <span className="purple">iOS and Android </span> platforms. My journey in the world of software development has led me to work with various technologies and frameworks, including <span className="purple">Android, iOS, React Native, and Flutter </span>.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading Tech Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Shubham</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
