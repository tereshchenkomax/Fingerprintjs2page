import React from "react";
import "./Message.css";

const Message = ({item}) => (
    <div className="message-container">
        <span className="user-bubble">{item.userName}</span>
        <span className="user-bubble is-info end">{item.msg}</span>
    </div>
);
export default Message;
