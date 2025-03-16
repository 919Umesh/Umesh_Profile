import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/second.jpg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I fell in love with programming and I have at least learnt
              something, I think… 🤷‍♂️
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="purple"> Flutter, Dart and Firebase. </b>
              </i>
              <br />
              <br />
              My field of Interest's are building new &nbsp;
              <i>
                <b className="purple">Mobile Apps and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                  Mobile Development.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b className="purple">Dotnet</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern Library and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> Asp.net MVC</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
  <Tilt>
    <img
      src={myImg}
      className="img-fluid"
      alt="avatar"
      style={{
        borderRadius: "20px 100px  20px 100px ",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    />
  </Tilt>
</Col>

        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/919Umesh"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/UmeshSh56100400"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
