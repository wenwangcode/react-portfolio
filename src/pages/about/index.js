import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
} from "../../content_option";

export const About = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
      <Row className="sec_sp">
  <Col lg="5">
    <h3 className="color_sec py-4">Featured In</h3>
  </Col>
  <Col lg="7">
    <div className="book-feature">
      <img
              src="https://dl.dropboxusercontent.com/scl/fi/y7qqw8q7mb1vzc5rdvwz4/WomenOfMSCover.jpeg?rlkey=gficukqjchr9a1p4qccx9oho5&st=10yh07my"
              alt="The Women of Microsoft Book Cover"
              style={{
                maxWidth: "300px",
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                marginTop: "1rem",
              }}
            />
      <div className="book-details">
        <h4>The Women of Microsoft: Empowering Stories from the Minds that Coded the World</h4>
        <p>
          I'm honored to be featured in this inspiring book, sharing my story as both a pianist and software engineer. 
          Published by Wiley, this book celebrates the brilliant women shaping technology at Microsoft.
        </p>
        <a
          href="https://a.co/d/c7KLzY0"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-2"
        >
          Learn More
        </a>
      </div>
    </div>
  </Col>
</Row>


      </Container>
    </HelmetProvider>
  );
};
