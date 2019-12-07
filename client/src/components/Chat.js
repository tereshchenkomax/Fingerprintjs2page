import React, {Component, Fragment} from 'react';
import Message from './Message';
import Send from './Send';
import User from './User';
import io from 'socket.io-client';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.div = React.createRef();
		this.state = {
			currentUser: {
				name: this.props.name,
				id: this.props.id
			},
			messages: [],
			inputMsg: '',
			isLogin: false,
			users: [],
			timestamp: ['loading']
		};
		this.socket = null;
	}

	abortController = new AbortController();

	componentDidMount() {
		this.setState({
			currentUser: {
				name: this.props.name,
				id: this.props.id
			}, isLogin: true
		});
		this.setListeners();
	}

	componentWillUnmount() {
		this.abortController.abort();
	}

	setListeners = () => {
		// this.socket = io('http://localhost:3001');
		this.socket = io(process.env.REACT_APP_IO_URL); //TODO

		this.socket.on('connect', () => {
			this.socket.emit('addUser', this.state.currentUser);
		});
		this.socket.on('message', data => {
			this.addMessage(data);
		});
		this.socket.on('updateUsers', data => {
			this.addUsers(data);
		});
		this.socket.on('chathistory', (messages) => {
			this.setState({messages})
		});
		this.socket.on('activity', timestamp => {
			this.setState({timestamp})
		})
	};
	changeMessage = event => {
		this.setState({inputMsg: event.target.value});
	};
	inputName = () => {
		const user = this.div.current.value;
		if (this.validName(user)) {
			this.setState({currentUser: user, isLogin: true});
			this.setListeners();
		}
	};
	addMessage = data => {
		this.setState(({messages}) => ({
			inputMsg: '',
			messages: [{userName: data.user.name, msg: data.message}, ...messages, ]
		}));
	};
	addUsers = (data) => {
		let arrdata = Object.keys(data).map(i => data[i]);
		this.setState(({users}) => ({
			users: arrdata
		}))
	};
	sendMessage = event => {
		event.preventDefault();
		const {currentUser, inputMsg} = this.state;
		if (inputMsg.trim().length) {
			this.socket.emit('message', {
				user: currentUser,
				message: inputMsg,
			});
			this.setState({inputMsg: ''});
		}
	};

	render() {
		const {messages, inputMsg, users, timestamp} = this.state;
		return (
			<Fragment>
				<User users={users}/>
				<div className='chat tile is-child is-6'>
					<div className='message-list'>
						<div className='messages'>
							{messages.map((item, key) => (
								<Message item={item} key={key}/>
							))}
						</div>
					</div>
					<Send
						value={inputMsg}
						onChange={this.changeMessage}
						onSend={this.sendMessage}
					/>
				</div>
				<div className='tile is-child'>
					<ul>
						{timestamp.map(timeframe => <li>{timeframe}</li>)}
					</ul>
				</div>
			</Fragment>
		);
	}
}

export default Chat;
