import React, {useState, useEffect} from 'react';
import request from "../../helpers/request";

const AdminPanel = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		usersRequest();
		console.log(users);
	}, []);

	const usersRequest = async () => {
		try {
			let response = await request('users/allusers', 'GET');
			const json = await response.json();
			const usersArray = Object.keys(json).map(i => json[i]);
			console.log(usersArray);
			setUsers(usersArray[0]);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<div>
			<ul>
				{users.map(user => {
					return (
						<div style={{border: '1px solid black'}} key={user.id}>
							{Object.keys(user).map(item => {
								console.log(user[item]);
								return <li className='conversation-list-item' key={item}>{user[item]}</li>
							})}
						</div>
					)
				})
				}
			</ul>
		</div>
	);
};

export default AdminPanel;
