import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col } from "react-bootstrap";

export const ContactUs = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll to bottom when new message added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // SSE for receiving Telegram replies
  useEffect(() => {
    const eventSource = new EventSource("https://cef6-71-212-135-152.ngrok-free.app/reply-stream");

    eventSource.onmessage = (event) => {
      console.log("Received Telegram reply:", event.data);
      const botMessage = { role: "assistant", content: event.data };
      setMessages((prev) => [...prev, botMessage]);
    };

eventSource.onopen = () => {
  console.log("SSE connection established.");
};
    eventSource.onerror = (err) => {
      console.log("SSE error.", JSON.stringify(err));
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://cef6-71-212-135-152.ngrok-free.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, userMessage, botMessage]);
    } catch (err) {
      console.error("Fetch failed:", err);
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
              ref={chatContainerRef}
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
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: msg.role === "user" ? "#dcf8c6" : "#f0f0f0",
                      padding: "10px 15px",
                      borderRadius: "20px",
                      maxWidth: "75%",
                      wordWrap: "break-word",
                      fontSize: "1rem",
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      color: "#333",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <strong style={{ fontSize: "0.85rem", color: "#555" }}>
                      {msg.role === "user" ? "You" : "WendyBot"}
                    </strong>
                    <div style={{ marginTop: "4px" }}>{msg.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ fontStyle: "italic", marginTop: "0.5rem" }}>
                  WendyBot is typing...
                </div>
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
