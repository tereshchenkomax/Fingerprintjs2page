import React, {Fragment, useState, useReducer} from 'react';
import AdminPanel from './AdminPanel'
import request from "../../helpers/request";

const AdminMain = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({...state, ...newState}),
		{
			userName: '',
			userPass: '',
		}
	);

	const loginRequest = async (data) => {
		try {
		let response = await request('login', 'POST', userInput);
		const json = await response.json();
		setLoggedIn(json);
		} catch (e) {
			console.log(e);
			setIsError(e)
		}
	};

	const handleClick = () => {
		loginRequest({})
	};

	const handleChange = evt => {
		const name = evt.target.name;
		const newValue = evt.target.value;
		setUserInput({[name]: newValue});
	};

	return (
		<Fragment>
			{isError && <div className='is-danger'>Something went wrong ...</div>}
			{!loggedIn ? (
				<div className="hero-body">
					<div className="container">
						<article className="card is-rounded">
							<div className="card-content">
								<h1 className="title">
									Log in
								</h1>
								<div className="field">
									<div className="control">
										<input className="input is-primary" name='userName' type="text" placeholder="login"
											   onChange={handleChange} value={userInput.userName}
										/>
									</div>
								</div>
								<div className="field">
									<div className="control">
										<input className="input is-primary" name='userPass' type="password"
											   placeholder="Password" onChange={handleChange} value={userInput.userPass}/>
									</div>
								</div>
								<div>
									<button className="button is-primary is-medium is-fullwidth" onClick={handleClick}>
										Login
									</button>
								</div>
							</div>
						</article>
					</div>
				</div>
			) : <AdminPanel/> }
		</Fragment>
	)
};

export default AdminMain;
