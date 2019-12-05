import React from "react";
import "./Message.css";

const Message = ({item}) => (
    <div className="message-container">
        <span className="user-bubble">{item.user}</span>
        <span className="user-bubble is-info end">{item.text}</span>
    </div>
);
export default Message;
