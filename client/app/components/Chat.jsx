"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendChatMessage = async () => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    const res = await fetch(`http://localhost:8080/chat?message=${message}`);
    const data = await res.json();
    console.log({ data });
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data?.message,
        documents: data?.docs,
      },
    ]);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Container */}
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type Your Message"
          onKeyPress={(e) => e.key === "Enter" && handleSendChatMessage()}
        />
        <Button onClick={handleSendChatMessage} disabled={!message?.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
