"use client";
import React, { useEffect, useState } from "react";
export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/contact").then(res => res.json()).then(setMessages);
  }, []);
  return (
    <div>
      <h1>Contact Messages</h1>
      <ul>
        {messages.map((msg: any) => (
          <li key={msg._id}>
            <b>{msg.name}</b> ({msg.email}): {msg.subject} <br /> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}