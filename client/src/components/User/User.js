import React from 'react'
import './Users.css'

const User = ({users}) => {
	return (
		<div>
			<h3>Online users</h3>
			<div className='conversation-list list'>
				{Object.keys(users).map(id => <div className='conversation-list-item' key={id}>{users[id]}</div>)}
			</div>
		</div>
	)
};

export default User
