import React, { Component, Fragment } from "react";
import Message from "./Message";
import Send from "./Send";
import User from './User';
import io from "socket.io-client";

class Chat extends Component {
	constructor(props) {
		super(props);
		this.div = React.createRef();
		this.state = {
			currentUser: this.props.name,
			messages: [],
			inputMsg: "",
			isLogin: false,
			users: {}
		};
		this.socket = null;
	}

	componentDidMount() {
		this.setState({ currentUser: this.props.name, isLogin: true });
		this.setListeners();
	}
	setListeners = () => {
		this.socket = io("http://localhost:3001/");
		this.socket.on("connect", () => {
			this.socket.emit("addUser", this.state.currentUser);
		});
		this.socket.on("message", data => {
			if (this.state.isLogin) this.addMessage(data);
		});
		this.socket.on("updateUsers", data => {
			if (this.state.isLogin) this.addUsers(data);
		});
	};
	changeMessage = event => {
		this.setState({ inputMsg: event.target.value });
	};
	inputName = () => {
		const user = this.div.current.value;
		if (this.validName(user)) {
			this.setState({ currentUser: user, isLogin: true });
			this.setListeners();
		}
	};
	addMessage = data => {
		this.setState(({ messages }) => ({
			inputMsg: "",
			messages: [...messages, { user: data.name, text: data.message }]
		}));
	};
	addUsers = (data) => {
		this.setState(({users}) => ({
			users: data
		}))
	};
	sendMessage = event => {
		event.preventDefault();
		const { currentUser, inputMsg } = this.state;
		if (inputMsg.trim().length) {
			this.socket.emit("message", {
				name: currentUser,
				message: inputMsg
			});
			this.setState({ inputMsg: "" });
		}
	};
	render() {
		const { messages, inputMsg, currentUser, isLogin, users } = this.state;
		if (!isLogin) {
			return (
				<div className="login">
					<span>Welcome</span>
					<input ref={this.div} defaultValue={currentUser} />
					<button onClick={this.inputName}>Ok</button>
				</div>
			);
		}
		return (
			<Fragment>
				<User users={users} />
				<div className="chat tile is-parent is-8">
					<div className="message-list">
						<div className="messages">
							{messages.map((item, key) => (
								<Message item={item} key={key} />
							))}
						</div>
					</div>
					<Send
						value={inputMsg}
						onChange={this.changeMessage}
						onSend={this.sendMessage}
					/>
				</div>
			</Fragment>
		);
	}
}

export default Chat;
