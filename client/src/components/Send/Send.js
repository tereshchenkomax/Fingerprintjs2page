import React from "react";
import "./Send.css";

const Send = ({value, onChange, onSend}) => (
	<form onSubmit={onSend} className="send-block">
		<input value={value} onChange={onChange} className="input-message" placeholder='Write messages here'/>
		<button type="submit" className="send">Post</button>
	</form>
);

export default Send;
