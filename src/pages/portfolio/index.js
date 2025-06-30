import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";

export const Portfolio = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2>Latest Piano Videos</h2>
          <div style={{ margin: "1rem 0" }}>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/Maar7hzezPM"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div style={{ margin: "1rem 0" }}>
               <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/PZ6u3IKsbm0"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/du0ThsjY1Sc"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div style={{ margin: "1rem 0" }}>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/du0ThsjY1Sc"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div style={{ margin: "1rem 0" }}>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/qael1I0XsmE"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div style={{ margin: "1rem 0" }}>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/zUX6BqS0WNE"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </Container>
    </HelmetProvider>
  );
};
