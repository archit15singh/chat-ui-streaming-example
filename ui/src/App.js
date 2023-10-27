import React, { useState } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import axios from "axios";

export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [cont, setcont] = useState("11111");

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });

      // Modify the Axios request to be a POST request with the desired body and headers.
      axios
        .post("http://localhost:3000/chat", { key: val }, {
          headers: { "Content-Type": "application/json", "Accept": "text/event-stream" }
        })
        .then((res) => {
          console.log(res.data);
          console.log("data", cont);
          setcont(res.data);
          setTimeout(() => {
            console.log("data_now", cont);
            appendMsg({
              type: "text",
              content: { text: res.data }
            });
          }, 1000);
        });
      setTyping(true);
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: "AI" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}
