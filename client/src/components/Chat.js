import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import query from "query-string";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

let socket;
const Chat = () => {
  const { search } = useLocation();
  const { name, room } = query.parse(search);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:4000");

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    socket.on("message", (message) => {
      setMessages((existingMsgs) => [...existingMsgs, message]);
    });

    socket.on("userList", ({ roomUsers }) => {
      setUsers(roomUsers);
    });

    return () => {
      socket.emit("disconnect");
      socket.close();
    };
  }, [name, room]);

  const sendMessage = (e) => {
    if (e.key === "Enter" && e.target.value) {
      socket.emit("message", e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div className="chat">
      <div className="user-list">
        <div>
          <strong>Users</strong>
        </div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
      <div className="chat-section">
        <div className="chat-head">
          <div className="room">{room}</div>
          <Link to="/">X</Link>
        </div>
        <div className="chat-box">
          <ScrollToBottom className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${name === msg.user ? "self" : ""}`}
              >
                <span>{msg.user}</span> <span>{msg.text}</span>
              </div>
            ))}
          </ScrollToBottom>
          <input placeholder="message" onKeyDown={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
