import React from "react";

import "./OnlineContainer.css";
import ScrollToBottom from "react-scroll-to-bottom";
const OnlineContainer = ({ users }) => (
  <div className="textContainer">
    <div className="onlinebar">
      <h3>Online Users</h3>
      <h3>{users.length}</h3>
    </div>
    {users ? (
      <ScrollToBottom className="activeContainer">
        {users.map(({ name }) => (
          <div key={name} className="activeItem">
            <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
          </div>
        ))}
      </ScrollToBottom>
    ) : null}
  </div>
);

export default OnlineContainer;
