import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col } from "react-bootstrap";

export const ContactUs = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Chat</title>
          <meta name="description" content="Chat with WendyBot" />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Chat with WendyBot</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <div
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                minHeight: "300px",
                maxHeight: "400px",
                overflowY: "auto",
                backgroundColor: "#f9f9f9",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: msg.role === "user" ? "right" : "left",
                    marginBottom: "1rem",
                  }}
                >
                  <strong>{msg.role === "user" ? "You" : "WendyBot"}:</strong>{" "}
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div style={{ fontStyle: "italic" }}>WendyBot is typing...</div>
              )}
            </div>
            <div className="input-area mt-4 d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Ask WendyBot..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="btn btn-primary ms-2" onClick={sendMessage}>
                Send
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
