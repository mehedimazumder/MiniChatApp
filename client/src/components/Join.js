import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="join">
      <div className="join-form">
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <Link to={`/chat?name=${name}&room=${room}`}>Join</Link>
      </div>
    </div>
  );
};

export default Join;
